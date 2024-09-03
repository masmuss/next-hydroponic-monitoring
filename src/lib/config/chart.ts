import {ChartConfig} from "@/components/ui/chart";

export const chartConfigs: Record<string, ChartConfig> = {
    temperature: {
        temp: {label: 'Temperature', color: "hsl(var(--chart-1))"},
        time: {label: 'Datetime'}
    },
    humidity: {
        hum: {label: 'Humidity', color: "hsl(var(--chart-3))"},
        time: {label: 'Datetime'}
    },
    acidity: {
        ph: {label: 'pH', color: "hsl(var(--chart-2))"},
        time: {label: 'Datetime'}
    },
    tds: {
        tds: {label: 'TDS', color: "hsl(var(--chart-4))"},
        time: {label: 'Datetime'}
    }
};