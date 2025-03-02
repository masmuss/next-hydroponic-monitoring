import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { calculateMappedSensorStats, cn } from "@/lib/utils";
import React from "react";

type MonitoringChartProps = {
    title: string;
    data: any[];
    config: ChartConfig;
    children?: React.ReactNode;
}

export default function MonitoringChart(props: MonitoringChartProps) {
    const {
        title,
        data,
        config,
        children,
    } = props;

    const dataKeys: string[] = Object.keys(config).filter(key => key !== 'time');
    const { min, max, average } = calculateMappedSensorStats(data, dataKeys[0]);

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className={cn('text-xl', 'md:text-xl')}>{title}</div>
                <div className={cn('text-xs', 'md:text-sm')}>
                    <span className="font-semibold">Min:</span> {min.toFixed(1)}{' '}
                    <span className="font-semibold">Max:</span> {max.toFixed(1)}{' '}
                    <span className="font-semibold">Avg:</span> {average.toFixed(1)}
                </div>
            </div>
            <div className={'mt-4'}>
                {
                    data.length === 0 ? (
                        <p className="text-sm md:text-base text-center">No data available for {title}</p>
                    ) : (
                        <ChartContainer config={config} className="w-full h-64 -ml-3">
                            <AreaChart accessibilityLayer data={data} syncId={'fluctuation-chart'}>
                                <CartesianGrid vertical={true} horizontal={true} strokeDasharray="3 3" />
                                <XAxis dataKey="time" tickLine={true} axisLine={true} />
                                <YAxis tickLine={true} axisLine={true} />
                                <ChartTooltip
                                    content={<CustomTooltip active={undefined} payload={undefined}
                                        label={undefined} />} />
                                {dataKeys.map((key) => (
                                    <>
                                        <defs>
                                            <linearGradient id={key} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={config[key as keyof ChartConfig].color}
                                                    stopOpacity={0.8} />
                                                <stop offset="95%" stopColor={config[key as keyof ChartConfig].color}
                                                    stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            key={key}
                                            type="monotone"
                                            dataKey={key}
                                            stroke={config[key as keyof ChartConfig].color}
                                            fillOpacity={1} fill={`url(${key})`} />
                                    </>
                                ))}
                                {children}
                            </AreaChart>
                        </ChartContainer>
                    )
                }
            </div>
        </div>
    );
};

// @ts-ignore
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        let title, name

        switch (payload[0].name) {
            case 'waterTemp':
                title = 'Water Temperature';
                name = '°C';
                break;
            case 'ph':
                title = 'pH';
                break;
            case 'tankTds':
                title = 'Tank TDS';
                name = 'ppm';
                break;
            case 'fieldTds':
                title = 'Field TDS';
                name = 'ppm';
                break;
        }

        return (
            <div className="bg-neutral-200 border border-neutral-300 p-2 rounded">
                <p className="text-sm">{`${label}`}</p>
                <div className={'flex justify-between gap-4'}>
                    <p className="text-xs">{title}</p>
                    <p className="text-xs">{`${payload[0].value.toFixed(1)} ${name !== undefined ? name : ''}`}</p>
                </div>
            </div>
        );
    }

    return null;
};