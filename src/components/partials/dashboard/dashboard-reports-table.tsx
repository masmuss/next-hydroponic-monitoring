import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {TabletsIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge";

export default function DashboardReportTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Error</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <TabletsIcon className="w-5 h-5"/>
                            <span>Smart Thermostat</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">Online</Badge>
                    </TableCell>
                    <TableCell>2 hours ago</TableCell>
                    <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <TabletsIcon className="w-5 h-5"/>
                            <span>Security Camera</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="secondary">Offline</Badge>
                    </TableCell>
                    <TableCell>1 day ago</TableCell>
                    <TableCell>Connection lost</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <TabletsIcon className="w-5 h-5"/>
                            <span>Smart Lightbulb</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">Online</Badge>
                    </TableCell>
                    <TableCell>30 minutes ago</TableCell>
                    <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <TabletsIcon className="w-5 h-5"/>
                            <span>Smart Lock</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="secondary">Offline</Badge>
                    </TableCell>
                    <TableCell>2 days ago</TableCell>
                    <TableCell>Low battery</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}