// import {realtimeDatabase} from "@/lib/config/firebase";
// import {
//     Database,
//     DatabaseReference,
//     DataSnapshot,
//     get,
//     getDatabase,
//     limitToLast,
//     orderByChild,
//     Query,
//     query,
//     ref
// } from "firebase/database";
// import {Device, Record} from "@/lib/static/types";
//
// type DevicesList = {
//     [deviceId: string]: {
//         id: string;
//         name: string;
//         lastUpdated: string;
//     };
// }
//
// export function getDevicesList(): Promise<DevicesList> {
//     const db: Database = getDatabase();
//     const devicesRef: DatabaseReference = ref(db, 'devices');
//
//     const snapshot: DataSnapshot = get(devicesRef);
//
//     if (snapshot.exists()) {
//         const devicesData = snapshot.val();
//
//         return Object.keys(devicesData).reduce((acc, deviceId) => {
//             const device = devicesData[deviceId];
//             acc[deviceId] = {
//                 id: device.id,
//                 name: device.name,
//                 lastUpdated: device.records ? device.records[device.records.length - 1].datetime : "N/A"
//             };
//             return acc;
//         }, {} as DevicesList);
//     } else {
//         return {};
//     }
// }
//
// export function countAllDevices(): Promise<number> {
//     const devicesRef: DatabaseReference = ref(realtimeDatabase, "devices");
//     const snapshot: DataSnapshot = get(devicesRef);
//
//     if (snapshot.exists()) {
//         const devices = snapshot.val();
//         return Object.keys(devices).length;
//     } else {
//         return 0;
//     }
// }
//
// export function getLatestDeviceRecord(deviceId: string): Promise<Record | null> {
//     const recordsRef: DatabaseReference = ref(realtimeDatabase, `devices/${deviceId}/records`);
//     const latestRecordQuery: Query = query(recordsRef, orderByChild("datetime"), limitToLast(1));
//
//     const snapshot: DataSnapshot = get(latestRecordQuery);
//
//     if (snapshot.exists()) {
//         const records = snapshot.val();
//         const latestRecord = Object.values(records)[0];
//         return latestRecord as Record;
//     } else {
//         return null;
//     }
// }
//
// export function getDeviceRecordDataStream(deviceId: string, date: string): Record[] {
//     const recordsRef: DatabaseReference = ref(realtimeDatabase, `devices/${deviceId}/records`);
//     const formattedDate = date.split("T")[0];
//
//     const snapshot: DataSnapshot = get(recordsRef);
//
//     if (snapshot.exists()) {
//         const records = snapshot.val();
//
//         // Convert the records to an array, filter by date, and sort by datetime
//         return Object.values(records)
//             .filter((record) => (record as Record).datetime.includes(formattedDate))
//             .sort((a, b) => new Date((a as Record).datetime).getTime() - new Date((b as Record).datetime).getTime()) as Record[];
//     } else {
//         return [];
//     }
// }
//
// export function getDeviceDetailStream(deviceId: string): Promise<Device | null> {
//     const deviceRef: DatabaseReference = ref(realtimeDatabase, `devices/${deviceId}`);
//     const snapshot: DataSnapshot = get(deviceRef);
//
//     if (snapshot.exists()) {
//         return snapshot.val() as Device;
//     } else {
//         return null;
//     }
// }

import {realtimeDatabase} from "@/lib/config/firebase";
import {DatabaseReference, DataSnapshot, limitToLast, onValue, orderByChild, query, ref} from "firebase/database";
import {Device, Record} from "@/lib/static/types";

type DevicesList = {
    [deviceId: string]: {
        id: string;
        name: string;
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
};

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
};

export function getDeviceRecordDataStream(deviceId: string, date: string, callback: (data: Record[]) => void) {
    const recordsRef = ref(realtimeDatabase, `devices/${deviceId}/records`);
    const formattedDate = date.split("T")[0];

    onValue(recordsRef, (snapshot) => {
        if (snapshot.exists()) {
            const records = snapshot.val();
            const dailyRecords = records.filter((record: Record) => {
                return record.datetime.includes(formattedDate);
            });
            callback(dailyRecords);
        } else {
            callback([]);
        }
    });
};

export function getDeviceDetailStream(deviceId: string, callback: (data: Device) => void) {
    const deviceRef: DatabaseReference = ref(realtimeDatabase, `devices/${deviceId}`);
    return onValue(deviceRef, (snapshot: DataSnapshot) => {
        const data: Device = snapshot.val() as Device;
        callback(data);
    });
}
