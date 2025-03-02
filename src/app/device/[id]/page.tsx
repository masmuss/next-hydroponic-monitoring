'use client'

import Monitoring from '@/components/views/monitoring';

export default function DeviceMonitoringPage({ params }: { params: { id: string } }) {

    return (
        <Monitoring deviceId={params.id} />
    );
}
