import { realtimeDatabase } from "@/lib/config/firebase";
import {
    DatabaseReference,
    DataSnapshot,
    endAt,
    limitToLast,
    off,
    onValue,
    orderByChild,
    query,
    ref,
    startAt
} from "firebase/database";
import { Device, DevicesList, SensorRecord as Record, SensorMappedData } from "@/lib/static/types";

/**
 * Helper untuk membangun referensi Firebase
 */
const getRef = (path: string): DatabaseReference => ref(realtimeDatabase, path);

/**
 * Helper untuk memproses snapshot menjadi objek yang lebih terstruktur
 */
const processSnapshot = <T>(snapshot: DataSnapshot, defaultValue: T): T => {
    return snapshot.exists() ? (snapshot.val() as T) : defaultValue;
};

/**
 * Mendapatkan daftar perangkat dengan informasi dasar
 */
export function getDevicesList(callback: (devices: DevicesList) => void) {
    onValue(getRef("devices"), (snapshot) => {
        const devicesData: { [key: string]: Device } = processSnapshot(snapshot, {});
        const devicesList: DevicesList = Object.keys(devicesData).reduce((acc, deviceId) => {
            const device = devicesData[deviceId];
            acc[deviceId] = {
                id: device.id,
                name: device.name,
                target: device.target,
                lastUpdated: device.records?.length ? device.records[device.records.length - 1].datetime : "N/A",
            };
            return acc;
        }, {} as DevicesList);
        callback(devicesList);
    });
}

/**
 * Menghitung jumlah perangkat
 */
export function countAllDevices(callback: (count: number) => void) {
    const unsubscribe = onValue(getRef("devices"), (snapshot) => {
        callback(snapshot.exists() ? Object.keys(snapshot.val()).length : 0);
    });

    return () => off(getRef("devices"), "value", unsubscribe);
}

/**
 * Mengambil record terbaru dari suatu perangkat
 */
export function getLatestDeviceRecord(deviceId: string, callback: (latestRecord: Record | null) => void) {
    const latestRecordQuery = query(getRef(`devices/${deviceId}/records`), orderByChild("datetime"), limitToLast(1));

    const unsubscribe = onValue(latestRecordQuery, (snapshot) => {
        callback(processSnapshot(snapshot, null));
    });

    return () => off(getRef(`devices/${deviceId}/records`), "value", unsubscribe);
}

/**
 * Mengambil data record berdasarkan tanggal dengan format dinamis
 */
export function getDeviceRecordDataStream(deviceId: string, date: string, callback: (data: SensorMappedData[]) => void) {
    const formattedDate = formatDate(date);
    const dateQuery = query(
        getRef(`devices/${deviceId}/records`),
        orderByChild("datetime"),
        startAt(`${formattedDate} 00:00:00`),
        endAt(`${formattedDate} 23:59:59`)
    );

    onValue(dateQuery, (snapshot) => {
        const rawData = processSnapshot(snapshot, {});
        const recordsArray: Record[] = Object.values(rawData) as Record[];

        const transformedData: SensorMappedData[] = recordsArray.map((record) => ({
            time: record.datetime,
            ...record,
        }));

        callback(transformedData);
    });
}

/**
 * Stream untuk mendapatkan detail perangkat secara real-time
 */
export function getDeviceDetailStream(deviceId: string, callback: (data: Device) => void) {
    const deviceRef = getRef(`devices/${deviceId}`);

    const unsubscribe = onValue(deviceRef, (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
            const deviceData = snapshot.val();

            const device: Device = {
                id: deviceData.id,
                name: deviceData.name,
                target: deviceData.target,
                record_count: deviceData.record_count,
                records: deviceData.records || [],
                configs: {
                    mode: deviceData.configs.mode,
                    relays: {
                        auto: { ...deviceData.configs.relays.auto },
                        manual: { ...deviceData.configs.relays.manual },
                    },
                    schedule: { ...deviceData.configs.schedule },
                    thresholds: { ...deviceData.configs.thresholds },
                },
            };

            callback(device);
        }
    });

    return () => off(deviceRef, "value", unsubscribe);
}

/**
 * Helper untuk memformat tanggal agar sesuai dengan filter Firebase
 */
const formatDate = (date: string): string => {
    const dateObj = new Date(date.split("T")[0]);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
};
