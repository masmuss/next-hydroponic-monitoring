import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import {getHour} from "@/lib/utils";
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
        <Card className="w-full">
            <CardHeader className="text-2xl font-semibold">{title}</CardHeader>
            <CardContent>
                {
                    data.length === 0 ? (
                        <p className="text-center">No data available for {title}</p>
                    ) : (
                        <ChartContainer config={config} className="min-h-[200px] w-full">
                            <LineChart accessibilityLayer data={data}>
                                <CartesianGrid vertical={false}/>
                                <XAxis dataKey="time" tickFormatter={getHour} tickLine={true} axisLine={true}/>
                                <YAxis tickLine={true} axisLine={true}/>
                                <ChartTooltip
                                    content={<ChartTooltipContent indicator="line" labelFormatter={getHour}/>}/>
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
            </CardContent>
        </Card>
    );
};