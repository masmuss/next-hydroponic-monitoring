import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import DashboardCard from "@/components/partials/dashboard/dashboard-card";
import {ExternalLink} from "lucide-react";
import DashboardReportTable from "@/components/partials/dashboard/dashboard-reports-table";

type DashboardViewProps = {
    devicesCount: number;
}

export default function DashboardView(props: DashboardViewProps) {
    const {devicesCount} = props;

    return (
        <div className="flex flex-col min-h-screen">
            <main className="grid gap-4 p-4 sm:p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
                    <DashboardCard
                        title={'Connected Devices'}
                        description={'Total number of connected IoT devices'}
                        count={devicesCount}
                        icon={ExternalLink}
                        linkHref={'/monitors'}
                    />
                </div>
                {/*<Card>*/}
                {/*    <CardHeader>*/}
                {/*        <CardTitle>Recent Device Activity</CardTitle>*/}
                {/*        <CardDescription>Monitor the status of your IoT devices</CardDescription>*/}
                {/*    </CardHeader>*/}
                {/*    <CardContent>*/}
                {/*        <DashboardReportTable/>*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}
            </main>
        </div>
    );
}
