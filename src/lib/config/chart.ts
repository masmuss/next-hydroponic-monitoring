import { ChartConfig } from "@/components/ui/chart";

type SensorConfig = {
    key: string;
    label: string;
    color: string;
};

export function generateChartConfigs(sensors: SensorConfig[]): Record<string, ChartConfig> {
    return sensors.reduce((acc, sensor) => {
        acc[sensor.key] = {
            value: { label: sensor.label, color: sensor.color },
            time: { label: "time" }
        };
        return acc;
    }, {} as Record<string, ChartConfig>);
}