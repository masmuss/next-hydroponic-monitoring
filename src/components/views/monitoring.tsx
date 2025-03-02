'use client'

import React, { useEffect, useState } from 'react';
import { Device, SensorRecord } from "@/lib/static/types";
import {
    getDeviceDetailStream,
    getDeviceRecordDataStream,
    getLatestDeviceRecord
} from "@/lib/services/device";
import { cn } from "@/lib/utils";
import { generateChartConfigs } from "@/lib/config/chart";
import MonitoringChart from "@/components/partials/monitoring/monitoring-chart";
import Loading from "@/components/loading";
import MonitoringLogActivity from "@/components/partials/monitoring/monitoring-log-activity";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReferenceLine } from "recharts";
import DeviceDetailsCard from "@/components/partials/device/device-detail-card";

export default function Monitoring({ deviceId }: { deviceId: string }) {
    const [device, setDevice] = useState<Device | null>(null);
    const [filteredRecords, setFilteredRecords] = useState<SensorRecord[]>([]);
    const [lastRecord, setLastRecord] = useState<SensorRecord | null>(null);
    const [date, setDate] = useState<string>(new Date().toLocaleDateString());

    useEffect(() => {
        getDeviceDetailStream(deviceId, setDevice);
        getLatestDeviceRecord(deviceId, setLastRecord);
        getDeviceRecordDataStream(deviceId, date, setFilteredRecords);
    }, [deviceId, date]);

    if (!device) return <Loading />;

    const availableSensors = filteredRecords.length > 0
        ? Object.keys(filteredRecords[0]).filter(key => key !== "datetime")
        : [];

    const dynamicChartConfigs = generateChartConfigs(
        availableSensors.map(sensor => ({
            key: sensor,
            label: sensor.replace(/_/g, " ").toUpperCase(),
            color: "#8884d8", // Bisa diatur lebih spesifik
        }))
    );

    return (
        <div className=''>
            <div className={'flex flex-col gap-4'}>
                <div className={cn(
                    'flex flex-col-reverse',
                    'md:flex-row-reverse gap-4'
                )}>
                    <MonitoringLogActivity setDate={setDate} filteredRecords={filteredRecords} />
                    <DeviceDetailsCard device={device} lastRecord={lastRecord} />
                </div>
                <Card className="w-full flex flex-col gap-4">
                    <CardHeader>
                        <h3 className={'font-semibold md:text-2xl'}>
                            Fluctuation Monitoring
                        </h3>
                    </CardHeader>
                    <CardContent className={'space-y-4'}>
                        {availableSensors.splice(1).map(sensor => {
                            const sensorData = filteredRecords.map(record => ({
                                time: record.datetime.split(" ")[1],
                                value: record[sensor] as number,
                            }));

                            const threshold = device.configs.thresholds[sensor] || { min: null, max: null };

                            return (
                                <MonitoringChart
                                    key={sensor}
                                    title={sensor.replace(/_/g, " ").toUpperCase()}
                                    data={sensorData}
                                    config={dynamicChartConfigs[sensor]}
                                >
                                    {threshold.max !== null && (
                                        <ReferenceLine
                                            y={threshold.max}
                                            label="Max"
                                            stroke="red"
                                            strokeWidth={0.8}
                                            strokeDasharray="4"
                                        />
                                    )}
                                    {threshold.min !== null && (
                                        <ReferenceLine
                                            y={threshold.min}
                                            label="Min"
                                            stroke="green"
                                            strokeWidth={0.8}
                                            strokeDasharray="4"
                                        />
                                    )}
                                </MonitoringChart>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
