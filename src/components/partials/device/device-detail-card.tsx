import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {cn, formatDateDifference} from "@/lib/utils";
import {Device, Record} from "@/lib/static/types";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";

type DeviceDetailsCardProps = { device: Device; lastRecord: Record | null };

const DataItem = ({label, value}: { label: string; value: string | React.ReactNode }) => (
    <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-right">{value}</span>
    </div>
);

const DeviceInfoSection = ({device, lastRecord}: { device: Device; lastRecord: Record | null }) => (
    <Section title="Device Information">
        <ul className="grid gap-3">
            <DataItem label="Device Name" value={device.name}/>
            <DataItem label="Device Type" value="Hydroponic"/>
            <DataItem label="Device Target" value={device.target}/>
            <DataItem label="Device ID" value={device.id}/>
            <DataItem label="Last Activity" value={formatDateDifference(lastRecord?.datetime!)}/>
        </ul>
    </Section>
);

const DeviceStatusSection = ({device}: { device: Device }) => (
    <Section title="Relay Status">
        <DataItem
            label="Device Mode"
            value={
                <Badge variant={device.configs.mode === 'manual' ? 'destructive' : 'default'}>
                    {device.configs.mode}
                </Badge>
            }
        />
        {["aerator", "nutrient_a", "nutrient_b", "ph_buffer"].map((relay) => (
            <DataItem
                key={relay}
                label={relay.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                // @ts-ignore
                value={device.configs.relays[device.configs.mode][relay] ? "ON" : "OFF"}
            />
        ))}
    </Section>
);

// Last Retrieved Data Section
const LastRetrievedDataSection = ({lastRecord}: { lastRecord: Record | null }) => (
    <Section title="Last Retrieved Data">
        <DataItem label="Acidity (pH)" value={lastRecord ? `${lastRecord.ph.toFixed(1)}` : "N/A"}/>
        <DataItem label="Temperature" value={lastRecord ? `${lastRecord.water_temp.toFixed(1)} °C` : "N/A"}/>
        <DataItem label="Tank TDS" value={lastRecord ? `${Math.floor(lastRecord.tank_tds)} ppm` : "N/A"}/>
        <DataItem label="Field TDS" value={lastRecord ? `${Math.floor(lastRecord.field_tds)} ppm` : "N/A"}/>
    </Section>
);

// Generic Section Component
const Section = ({title, children}: { title: string; children: React.ReactNode }) => (
    <div className="grid gap-3">
        <div className="font-semibold">{title}</div>
        {children}
    </div>
);

// Main Component
export default function DeviceDetailsCard({device, lastRecord}: DeviceDetailsCardProps) {
    return (
        <Card className={cn("w-full", "md:w-1/4")}>
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
