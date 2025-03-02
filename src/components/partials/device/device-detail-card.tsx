import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatDateDifference } from "@/lib/utils";
import { Device, SensorRecord as Record } from "@/lib/static/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type DeviceDetailsCardProps = { device: Device; lastRecord: Record | null };

const DataItem = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-right">{value}</span>
    </div>
);

const DeviceInfoSection = ({ device, lastRecord }: { device: Device; lastRecord: Record | null }) => (
    <Section title="Device Information">
        <ul className="grid gap-3">
            <DataItem label="Device Name" value={device.name} />
            <DataItem label="Device Type" value="Hydroponic" />
            <DataItem label="Device Target" value={device.target} />
            <DataItem label="Device ID" value={device.id} />
            <DataItem label="Last Activity" value={formatDateDifference(lastRecord?.datetime || "")} />
        </ul>
    </Section>
);

const DeviceStatusSection = ({ device }: { device: Device }) => {
    const relayStatus = device.configs.relays[device.configs.mode];

    return (
        <Section title="Relay Status">
            <DataItem
                label="Device Mode"
                value={
                    <Badge variant={device.configs.mode === 'manual' ? 'destructive' : 'default'}>
                        {device.configs.mode}
                    </Badge>
                }
            />
            {Object.keys(relayStatus).map((relay) => (
                <DataItem
                    key={relay}
                    label={relay.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    value={relayStatus[relay] ? "ON" : "OFF"}
                />
            ))}
        </Section>
    );
};

const LastRetrievedDataSection = ({ lastRecord }: { lastRecord: Record | null }) => {
    if (!lastRecord) {
        return (
            <Section title="Last Retrieved Data">
                <DataItem label="No Data Available" value="N/A" />
            </Section>
        );
    }

    return (
        <Section title="Last Retrieved Data">
            {Object.entries(lastRecord).map(([sensor, value]) => {
                if (sensor === "datetime") return null; // Jangan tampilkan datetime di sini

                // Jika value adalah objek, render sub-propertinya
                if (typeof value === "object" && value !== null) {
                    return Object.entries(value).map(([subSensor, subValue]) => (
                        <DataItem
                            key={`${sensor}-${subSensor}`}
                            label={subSensor.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            value={typeof subValue === "number" ? subValue.toFixed(1) : String(subValue) || "N/A"}
                        />
                    ));
                }

                return (
                    <DataItem
                        key={sensor}
                        label={sensor.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        value={typeof value === "number" ? value.toFixed(1) : String(value) || "N/A"}
                    />
                );
            })}
        </Section>
    );
};

// 🔹 Generic Section Component
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="grid gap-3">
        <div className="font-semibold">{title}</div>
        {children}
    </div>
);

// 🔹 Main Component
export default function DeviceDetailsCard({ device, lastRecord }: DeviceDetailsCardProps) {
    return (
        <Card className={cn("w-full", "md:w-1/4")}>
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
