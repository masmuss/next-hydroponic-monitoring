export type Devices = {
    [deviceId: string]: {
        configs: Config;
        id: string;
        name: string;
        target: string;
        records: Record[];
    };
};

export type Device = {
    configs: Config;
    id: string;
    name: string;
    target: string;
    records: Record[];
};

export type Config = {
    solvents : {
        a: number;
        b: number;
    },
    relays: {
        relay1: boolean;
        relay2: boolean;
        relay3: boolean;
        relay4: boolean;
    }
}

export type Record = {
    datetime: string;
    hum: number;
    ph: number;
    tds: number;
    temp: number;
}