'use client'

import {useEffect, useState} from "react";
import {countAllDevices} from "@/lib/services/device";
import DashboardView from "@/components/views/dashboard";

export default function DashboardPage() {
    const [devicesCount, setDevicesCount] = useState(0)

    useEffect(() => {
        countAllDevices(setDevicesCount)
    }, [])

    return (
        <DashboardView devicesCount={devicesCount} />
    )
}