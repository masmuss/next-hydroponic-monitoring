export type SensorRecord = {
    datetime: string;
    [sensor: string]: number | string;
};

export type Device = {
    id: string;
    name: string;
    target: string;
    record_count: number;
    records: SensorRecord[];
    configs: Config;
};

export type Config = {
    mode: "manual" | "auto";
    relays: {
        auto: { [key: string]: boolean };
        manual: { [key: string]: boolean };
    };
    schedule: { [key: string]: number };
    thresholds: { [key: string]: { min: number; max: number } };
};

export type SensorMappedData = Record<string, number | string> & { datetime: string };

export type SensorStats = {
    min: number;
    max: number;
    average: number;
};

export type DevicesList = {
    [deviceId: string]: {
        id: string;
        name: string;
        target: string;
        lastUpdated: string;
    };
};
