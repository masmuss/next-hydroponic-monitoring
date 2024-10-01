import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {cn, formatDateDifference} from "@/lib/utils";
import {Device, Record} from "@/lib/static/types";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Switch} from "@/components/ui/switch";
import {changeDeviceRelayStatus} from "@/lib/services/device";

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
                <span className="text-muted-foreground">Device Target</span>
                <span className="text-right">{device.target}</span>
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
            <RelayStatus relays={device.configs.relays} deviceId={device.id}/>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground">A</span>
            <span>{device.configs.solvents.a} mL</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground">B</span>
            <span>{device.configs.solvents.b} mL</span>
        </div>
    </div>
);

const RelayStatus = ({relays, deviceId}: { relays: any, deviceId: string }) => (
    <div className="flex gap-1">
        {Object.keys(relays).map((relayKey, index) => (
            <TooltipProvider key={relayKey}>
                <Tooltip>
                    <TooltipTrigger>
                        <Switch
                            checked={relays[relayKey]}
                            onCheckedChange={
                                (checked) => changeDeviceRelayStatus(deviceId, relayKey, checked)
                            }
                        />
                    </TooltipTrigger>
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
        <DataItem label="Acidity (pH)" value={lastRecord ? `${lastRecord.ph}` : 'N/A'}/>
        <DataItem label="Temperature" value={lastRecord ? `${lastRecord.temp} °C` : 'N/A'}/>
        <DataItem label="Humidity" value={lastRecord ? `${lastRecord.hum}%` : 'N/A'}/>
        <DataItem label="Total Dissolved Solids" value={lastRecord ? `${Math.floor(lastRecord.tds)} ppm` : 'N/A'}/>
    </div>
);

const DataItem = ({label, value}: { label: string; value: string | undefined }) => (
    <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className='text-right'>{value}</span>
    </div>
);

export default function DeviceDetailsCard({device, lastRecord}: DeviceDetailsCardProps) {
    return (
        <Card className={cn(
            'w-full',
            'md:w-1/4'
        )}>
            <CardHeader>
                <div className="grid gap-1">
                    <CardTitle>Device Details</CardTitle>
                    <CardDescription>View detailed information about your IoT devices.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="text-sm">
                <DeviceInfoSection device={device} lastRecord={lastRecord}/>
                <Separator className="my-4"/>
                <DeviceStatusSection device={device}/>
                <Separator className="my-4"/>
                <LastRetrievedDataSection lastRecord={lastRecord}/>
            </CardContent>
        </Card>
    );
}
