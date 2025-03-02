import { ColumnDef } from "@tanstack/react-table";
import { SensorRecord } from "@/lib/static/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import React from "react";

export const generateMonitoringColumns = (records: SensorRecord[]): ColumnDef<SensorRecord>[] => {
    if (records.length === 0) return []; // Jika tidak ada data, jangan buat kolom

    const sampleRecord = records[0]; // Ambil contoh record untuk melihat sensor yang tersedia
    const sensorKeys = Object.keys(sampleRecord).filter(key => key !== "datetime"); // Pastikan datetime tidak masuk lagi

    // 🔹 Kolom pertama: Datetime
    const columns: ColumnDef<SensorRecord>[] = [
        {
            accessorKey: "datetime",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-xs whitespace-nowrap md:text-sm"
                >
                    time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-center text-xs whitespace-nowrap md:text-sm">
                    {row.original.datetime.split(" ")[1]}
                </span>
            )
        },
        ...sensorKeys.splice(1).map((sensor) => ({
            accessorKey: sensor,
            header: () => (
                <span className="text-xs whitespace-nowrap md:text-sm text-center">
                    {sensor.toLowerCase()}
                </span>
            ),
            cell: ({ row }: { row: any }) => {
                const value = row.original[sensor];

                return (
                    <span className="text-center text-xs whitespace-nowrap md:text-sm">
                        {typeof value === "number" ? value.toFixed(1) : value}
                    </span>
                );
            }
        }))
    ];

    return columns;
};
