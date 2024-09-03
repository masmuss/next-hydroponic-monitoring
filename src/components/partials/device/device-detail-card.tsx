import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {formatDateDifference} from "@/lib/utils";
import {Device, Record} from "@/lib/static/types";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

type DeviceDetailsCardProps = { device: Device; lastRecord: Record | null }

const DeviceInfoSection = ({device, lastRecord}: { device: Device; lastRecord: Record | null }) => (
    <div className="grid gap-3">
        <div className="font-semibold">Device Information</div>
        <ul className="grid gap-3">
            <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Name</span>
                <span>{device.name}</span>
            </li>
            <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Type</span>
                <span>Hydroponic</span>
            </li>
            <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Device ID</span>
                <span>{device.id}</span>
            </li>
            <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Activity</span>
                <span>{formatDateDifference(lastRecord?.datetime!)}</span>
            </li>
        </ul>
    </div>
);

const DeviceStatusSection = ({device}: { device: Device }) => (
    <div className={`grid gap-3`}>
        <div className="font-semibold">Device Status</div>
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Connection Status</span>
            <Badge variant="secondary">Online</Badge>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Relay Status</span>
            <RelayStatus relays={device.configs} />
        </div>
    </div>
);

const RelayStatus = ({relays}: { relays: any }) => (
    <div className="flex gap-1">
        {Object.keys(relays).map((relayKey, index) => (
            <TooltipProvider key={relayKey}>
                <Tooltip>
                    <TooltipTrigger
                        className={`w-3 h-3 rounded-full ${relays[relayKey] ? 'bg-primary' : 'bg-secondary'}`}
                    />
                    <TooltipContent>
                        {`Relay ${index + 1}: ${relays[relayKey] ? 'ON' : 'OFF'}`}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ))}
    </div>
);

const LastRetrievedDataSection = ({lastRecord}: { lastRecord: Record | null }) => (
    <div className={`grid gap-3`}>
        <div className="font-semibold">Last Retrieved Data</div>
        <DataItem label="Acidity (pH)" value={`${lastRecord?.ph!}`} />
        <DataItem label="Temperature" value={`${lastRecord?.temp} °C`} />
        <DataItem label="Humidity" value={`${lastRecord?.hum}%`} />
        <DataItem label="Total Dissolved Solids" value={`${lastRecord?.tds} ppm`} />
    </div>
);

const DataItem = ({label, value}: { label: string; value: string | undefined }) => (
    <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span>{value}</span>
    </div>
);

export default function DeviceDetailsCard({device, lastRecord}: DeviceDetailsCardProps) {
    return (
        <Card className="w-1/4">
            <CardHeader>
                <div className="grid gap-1">
                    <CardTitle>Device Details</CardTitle>
                    <CardDescription>View detailed information about your IoT devices.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="text-sm">
                <DeviceInfoSection device={device} lastRecord={lastRecord} />
                <Separator className="my-4" />
                <DeviceStatusSection device={device} />
                <Separator className="my-4" />
                <LastRetrievedDataSection lastRecord={lastRecord} />
            </CardContent>
        </Card>
    );
}