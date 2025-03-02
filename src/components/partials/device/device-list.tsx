'use client'

import { useEffect, useState } from "react";
import { getDevicesList } from "@/lib/services/device";
import Loading from "@/components/loading";
import DeviceCard from "@/components/partials/device/device-card";
import { DevicesList } from "@/lib/static/types";

export default function DeviceList() {
    const [devices, setDevices] = useState<DevicesList | null>(null);

    useEffect(() => {
        getDevicesList((devices) => {
            setDevices(devices);
        });
    }, []);

    return (
        <div className="w-full flex justify-center items-center">
            {devices ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-sm gap-4">
                    {
                        Object.keys(devices).map((deviceId) => {
                            const device = devices[deviceId];
                            return (
                                <DeviceCard key={device.id} id={device.id} name={device.name} target={device.target} lastUpdated={device.lastUpdated} />
                            );
                        })
                    }
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
