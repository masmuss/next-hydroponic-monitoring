import {ChartConfig} from "@/components/ui/chart";

export const chartConfigs: Record<string, ChartConfig> = {
    waterTemp: {
        waterTemp: {label: 'Water Temperature', color: "hsl(var(--chart-1))"},
        time: {label: 'Datetime'}
    },
    tankTds: {
        tankTds: {label: 'Tank TDS', color: "hsl(var(--chart-3))"},
        time: {label: 'Datetime'}
    },
    acidity: {
        ph: {label: 'pH', color: "hsl(var(--chart-2))"},
        time: {label: 'Datetime'}
    },
    fieldTds: {
        fieldTds: {label: 'Field TDS', color: "hsl(var(--chart-4))"},
        time: {label: 'Datetime'}
    }
};