'use client'

import React, {useEffect, useState} from 'react';
import {Device, Record as DeviceRecords} from "@/lib/static/types";
import {getDeviceDetailStream, getDeviceRecordDataStream, getLatestDeviceRecord} from "@/lib/services/device";
import {mapDeviceRecordToObject} from "@/lib/utils";
import {chartConfigs} from "@/lib/config/chart";
import MonitoringChart from "@/components/partials/monitoring/monitoring-chart";
import Loading from "@/components/loading";
import DeviceDetailsCard from "@/components/partials/device/device-detail-card";
import MonitoringLogActivity from "@/components/partials/monitoring/monitoring-log-activity";

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

    const {phMap, tempMap, humMap, tdsMap} = mapDeviceRecordToObject(filteredRecords);

    return (
        <div className={'p-6 space-y-4'}>
            <header>
                <h1 className="font-bold text-4xl">Device Monitoring</h1>
            </header>
            <div className="flex flex-row-reverse gap-4">
                <MonitoringLogActivity setDate={setDate} filteredRecords={filteredRecords}/>
                <DeviceDetailsCard device={device} lastRecord={lastRecord}/>
            </div>
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex gap-4">
                    <MonitoringChart
                        title="Temperature"
                        data={tempMap}
                        config={chartConfigs.temperature}
                    />
                    <MonitoringChart
                        title="Humidity"
                        data={humMap}
                        config={chartConfigs.humidity}
                    />
                </div>
                <div className="w-full flex gap-4">
                    <MonitoringChart
                        title="Acidity"
                        data={phMap}
                        config={chartConfigs.acidity}
                    />
                    <MonitoringChart
                        title="Total Dissolved Solids"
                        data={tdsMap}
                        config={chartConfigs.tds}
                    />
                </div>
            </div>
        </div>
    );
}
