import {realtimeDatabase} from "@/lib/config/firebase";
import {DatabaseReference, DataSnapshot, limitToLast, onValue, orderByChild, query, ref} from "firebase/database";
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

    onValue(devicesRef, (snapshot) => {
        if (snapshot.exists()) {
            const devices = snapshot.val();
            const deviceCount = Object.keys(devices).length;
            callback(deviceCount);
        } else {
            callback(0);
        }
    });
}

export function getLatestDeviceRecord(deviceId: string, callback: (latestRecord: Record | null) => void) {
    const recordsRef = ref(realtimeDatabase, `devices/${deviceId}/records`);

    // Query to order the records by 'datetime' and limit to the last record
    const latestRecordQuery = query(recordsRef, orderByChild("datetime"), limitToLast(1));

    onValue(latestRecordQuery, (snapshot) => {
        if (snapshot.exists()) {
            const records = snapshot.val();
            // Firebase returns an object, convert it to an array and get the first (and only) record
            const latestRecord = Object.values(records)[0];
            callback(latestRecord as Record);
        } else {
            callback(null);
        }
    });
}

export function getDeviceRecordDataStream(deviceId: string, date: string, callback: (data: Record[]) => void) {
    const recordsRef = ref(realtimeDatabase, `devices/${deviceId}/records`);
    const dateObj = new Date(date.split("T")[0]);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    onValue(recordsRef, (snapshot) => {
        if (snapshot.exists()) {
            const records: Record[] = snapshot.val();

            if (!records) {
                callback([]);
                return;
            }

            const dailyRecords = records.filter((record: Record) => {
                return record.datetime && record.datetime.includes(formattedDate);
            });
            callback(dailyRecords);
        } else {
            callback([]);
        }
    });
}

export function getDeviceDetailStream(deviceId: string, callback: (data: Device) => void) {
    const deviceRef: DatabaseReference = ref(realtimeDatabase, `devices/${deviceId}`);
    return onValue(deviceRef, (snapshot: DataSnapshot) => {
        const data: Device = snapshot.val() as Device;
        callback(data);
    });
}
