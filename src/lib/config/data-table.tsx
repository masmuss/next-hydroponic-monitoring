import {ColumnDef} from "@tanstack/react-table";
import {Record as DeviceRecords} from "@/lib/static/types";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import React from "react";
import {getHour} from "@/lib/utils";

export const monitoringDatatableColumns: ColumnDef<DeviceRecords>[] = [
    {
        accessorKey: 'datetime',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Time
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => {
            return (
                <span className={'text-right'}>{getHour(row.original.datetime)}</span>
            );
        }
    },
    {
        header: 'Temperature',
        accessorKey: 'temp',
        cell: ({row}) => {
            return (
                <span className={'text-right'}>{row.original.temp} °C</span>
            );
        }
    },
    {
        header: 'Humidity',
        accessorKey: 'hum',
        cell: ({row}) => {
            return (
                <span className={'text-right'}>{row.original.hum} %</span>
            );
        }
    },
    {
        header: 'Acidity',
        accessorKey: 'ph',
        cell: ({row}) => {
            return (
                <span className={'text-center'}>{row.original.ph.toFixed(1)}</span>
            );
        }
    },
    {
        header: 'TDS',
        accessorKey: 'tds',
        cell: ({row}) => {
            return (
                <span className={'text-right'}>{row.original.tds.toFixed(1)} ppm</span>
            );
        }
    },
]