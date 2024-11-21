'use client'

import React, {useEffect, useState} from 'react';
import {Device, Record as DeviceRecords} from "@/lib/static/types";
import {getDeviceDetailStream, getDeviceRecordDataStream, getLatestDeviceRecord} from "@/lib/services/device";
import {cn, mapDeviceRecordToObject} from "@/lib/utils";
import {chartConfigs} from "@/lib/config/chart";
import MonitoringChart from "@/components/partials/monitoring/monitoring-chart";
import Loading from "@/components/loading";
import DeviceDetailsCard from "@/components/partials/device/device-detail-card";
import MonitoringLogActivity from "@/components/partials/monitoring/monitoring-log-activity";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {ReferenceLine} from "recharts";

export default function DeviceMonitoringPage({params}: { params: { id: string } }) {
    const [device, setDevice] = useState<Device | null>(null);
    const [filteredRecords, setFilteredRecords] = useState<DeviceRecords[]>([]);
    const [lastRecord, setLastRecord] = useState<DeviceRecords | null>(null);
    const [date, setDate] = useState<string>(new Date().toLocaleDateString());

    useEffect(() => {
        getDeviceDetailStream(params.id, setDevice);
        getLatestDeviceRecord(params.id, setLastRecord);
        getDeviceRecordDataStream(params.id, date, setFilteredRecords);
    }, [params.id, date]);

    if (!device) return <Loading/>;

    const {phMap, waterTempMap, tankTdsMap, fieldTdsMap} = mapDeviceRecordToObject(filteredRecords);

    return (
        <div className={'p-6 space-y-4'}>
            <header className={'mb-4 md:mb-2'}>
                <h1 className={cn('font-semibold text-2xl', 'md:font-bold md:text-4xl')}>Device Monitoring</h1>
            </header>
            <div className={cn(
                'flex flex-col-reverse',
                'md:flex-row-reverse gap-4'
            )}>
                <MonitoringLogActivity setDate={setDate} filteredRecords={filteredRecords}/>
                <DeviceDetailsCard device={device} lastRecord={lastRecord}/>
            </div>
            <Card className="w-full flex flex-col gap-4">
                <CardHeader>
                    <h3 className={'font-semibold md:text-2xl'}>
                        Fluctuation Monitoring
                    </h3>
                </CardHeader>
                <CardContent>
                    <MonitoringChart
                        title="Water Temperature"
                        data={waterTempMap}
                        config={chartConfigs.waterTemp}
                    >
                        <ReferenceLine y={30} label="Max" stroke="red" strokeWidth={0.8} strokeDasharray="4" />
                        <ReferenceLine y={25} label="Min" stroke="green" strokeWidth={0.8} strokeDasharray="4" />
                    </MonitoringChart>
                    <MonitoringChart
                        title="Acidity"
                        data={phMap}
                        config={chartConfigs.acidity}
                    >
                        <ReferenceLine y={7} label="Max" stroke="red" strokeWidth={0.8} strokeDasharray="4" />
                        <ReferenceLine y={6} label="Min" stroke="green" strokeWidth={0.8} strokeDasharray="4" />
                    </MonitoringChart>
                    <MonitoringChart
                        title="Tank TDS"
                        data={tankTdsMap}
                        config={chartConfigs.tankTds}
                    >
                        <ReferenceLine y={1000} label="Max" stroke="red" strokeWidth={0.8} strokeDasharray="4" />
                        <ReferenceLine y={500} label="Min" stroke="green" strokeWidth={0.8} strokeDasharray="4" />
                    </MonitoringChart>
                    <MonitoringChart
                        title="Field TDS"
                        data={fieldTdsMap}
                        config={chartConfigs.fieldTds}
                    >
                        <ReferenceLine y={1000} label="Max" stroke="red" strokeWidth={0.8} strokeDasharray="4" />
                        <ReferenceLine y={500} label="Min" stroke="green" strokeWidth={0.8} strokeDasharray="4" />
                    </MonitoringChart>
                </CardContent>
            </Card>
        </div>
    );
}
