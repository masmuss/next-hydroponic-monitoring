import React from 'react';
import DeviceList from "@/components/partials/device/device-list";

export default function MonitorView() {
    return (
        <div className="flex flex-col min-h-screen bg-muted/40">
            <main className="flex-1 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Devices</h1>
                </div>
                <div className="flex flex-wrap gap-6">
                    <DeviceList/>
                </div>
            </main>
        </div>
    );
}