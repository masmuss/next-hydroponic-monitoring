import {realtimeDatabase} from "@/lib/config/firebase";
import {
    DatabaseReference,
    DataSnapshot,
    endAt,
    limitToLast, off,
    onValue,
    orderByChild,
    query,
    ref,
    startAt
} from "firebase/database";
import {Device, Record} from "@/lib/static/types";

type DevicesList = {
    [deviceId: string]: {
        id: string;
        name: string;
        target: string;
        lastUpdated: string;
    };
}

export function getDevicesList(callback: (devices: DevicesList) => void) {
    const devicesRef = ref(realtimeDatabase, 'devices');

    onValue(devicesRef, (snapshot) => {
        if (snapshot.exists()) {
            const devicesData = snapshot.val();
            const devicesList = Object.keys(devicesData).reduce((acc, deviceId) => {
                const device = devicesData[deviceId];
                acc[deviceId] = {
                    id: device.id,
                    name: device.name,
                    target: device.target,
                    lastUpdated: device.records ? device.records[device.records.length - 1].datetime : "N/A"
                };
                return acc;
            }, {} as DevicesList);
            callback(devicesList);
        } else {
            callback({});
        }
    })
}

export function countAllDevices(callback: (count: number) => void) {
    const devicesRef = ref(realtimeDatabase, "devices");

    const unsubscribe = onValue(devicesRef, (snapshot) => {
        if (snapshot.exists()) {
            const devices = snapshot.val();
            const deviceCount = Object.keys(devices).length;
            callback(deviceCount);
        } else {
            callback(0);
        }
    });

    return () => {
        off(devicesRef, "value", unsubscribe);
    };
}

export function getLatestDeviceRecord(deviceId: string, callback: (latestRecord: Record | null) => void) {
    const recordsRef = ref(realtimeDatabase, `devices/${deviceId}/records`);

    const latestRecordQuery = query(recordsRef, orderByChild("datetime"), limitToLast(1));

    const unsubscribe = onValue(latestRecordQuery, (snapshot) => {
        if (snapshot.exists()) {
            const records = snapshot.val();
            const latestRecord = Object.values(records)[0];
            callback(latestRecord as Record);
        } else {
            callback(null);
        }
    });

    return () => {
        off(recordsRef, "value", unsubscribe);
    };
}

export function getDeviceRecordDataStream(deviceId: string, date: string, callback: (data: Record[]) => void) {
    const recordsRef = ref(realtimeDatabase, `devices/${deviceId}/records`);
    const dateObj = new Date(date.split("T")[0]);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    const dateStart = `${formattedDate} 00:00:00`;
    const dateEnd = `${formattedDate} 23:59:59`;

    const dateQuery = query(recordsRef, orderByChild("datetime"), startAt(dateStart), endAt(dateEnd));

    onValue(dateQuery, (snapshot) => {
        if (snapshot.exists()) {
            callback(Object.values(snapshot.val()) as Record[]);
        } else {
            callback([]);
        }
    });
}

export function getDeviceDetailStream(deviceId: string, callback: (data: Device) => void) {
    const deviceRef: DatabaseReference = ref(realtimeDatabase, `devices/${deviceId}`);
    const unsubscribe = onValue(deviceRef, (snapshot: DataSnapshot) => {
        const data: Device = snapshot.val() as Device;
        callback(data);
    });

    return () => {
        off(deviceRef, "value", unsubscribe);
    };
}

