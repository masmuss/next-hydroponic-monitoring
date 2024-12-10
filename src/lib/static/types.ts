export type Devices = {
    [deviceId: string]: Device;
};

export type Device = {
    configs: Config;
    id: string;
    name: string;
    target: string;
    record_count: number;
    records: Record[];
};

export type Config = {
    mode: "manual" | "auto";
    relays: {
        auto: Relays;
        manual: Relays;
    };
    schedule: {
        week_1: number
        week_2: number
        week_5: number
        week_6: number
    }
}

export type Relays = {
    aerator: boolean
    nutrient_a: boolean
    nutrient_b: boolean
    ph_buffer: boolean
}

export type Record = {
    datetime: string;
    field_tds: number;
    ph: number;
    tank_tds: number;
    water_temp: number;
}

export type SensorMappedData = {
    // @ts-ignore
    time: string;
    [sensor: string]: number;
};

export type SensorStats = {
    min: number;
    max: number;
    average: number;
};