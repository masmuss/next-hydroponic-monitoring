import {ChartConfig, ChartContainer, ChartTooltip} from "@/components/ui/chart";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import {cn, getHour} from "@/lib/utils";
import React from "react";

type MonitoringChartProps = {
    title: string;
    data: any[];
    config: ChartConfig;
}

export default function MonitoringChart(props: MonitoringChartProps) {
    const {
        title,
        data,
        config,
    } = props;

    const dataKeys: string[] = Object.keys(config).filter(key => key !== 'time');

    return (
        <div className="w-full">
            <div className={cn('text-xl', 'md:text-xl')}>{title}</div>
            <div className={'mt-4'}>
                {
                    data.length === 0 ? (
                        <p className="text-sm md:text-base text-center">No data available for {title}</p>
                    ) : (
                        <ChartContainer config={config} className="w-full h-64">
                            <LineChart accessibilityLayer data={data} syncId={'fluctuation-chart'}>
                                <CartesianGrid vertical={true} horizontal={true} strokeDasharray="3 3"/>
                                <XAxis dataKey="time" tickLine={true} tickFormatter={getHour} axisLine={true}/>
                                <YAxis tickLine={true} axisLine={true}/>
                                <ChartTooltip
                                    content={<CustomTooltip/>}/>
                                {dataKeys.map((key) => (
                                    <Line
                                        key={key}
                                        dataKey={key}
                                        stroke={config[key as keyof ChartConfig].color}
                                        radius={4}
                                    />
                                ))}
                            </LineChart>
                        </ChartContainer>
                    )
                }
            </div>
        </div>
    );
};

// @ts-ignore
const CustomTooltip = ({active, payload, label}) => {
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
                <p className="text-sm">{`${getHour(label)}`}</p>
                <div className={'flex justify-between gap-4'}>
                    <p className="text-xs">{title}</p>
                    <p className="text-xs">{`${payload[0].value.toFixed(1)} ${name !== undefined ? name : ''}`}</p>
                </div>
            </div>
        );
    }

    return null;
};