'use client'

import {useEffect, useState} from "react";
import {getDevicesList} from "@/lib/services/device";
import Loading from "@/components/loading";
import DeviceCard from "@/components/partials/device/device-card";

type DevicesList = {
    [deviceId: string]: {
        id: string;
        name: string;
        target: string;
        lastUpdated: string;
    };
}

export default function DeviceList() {
    const [devices, setDevices] = useState<DevicesList | null>(null);

    useEffect(() => {
        getDevicesList((devices) => {
            setDevices(devices);
        });
    }, []);

    return (
        <div className={'flex flex-wrap text-sm gap-4'}>
            {devices ? (
                Object.keys(devices).map((deviceId) => {
                    const device = devices[deviceId];
                    return (
                        <DeviceCard key={device.id} id={device.id} name={device.name} target={device.target} lastUpdated={device.lastUpdated}/>
                    );
                })
            ) : (
                <Loading/>
            )}
        </div>
    );
}
