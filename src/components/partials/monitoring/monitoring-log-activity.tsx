import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DatePickerWithPresets from "@/components/date-picker";
import { DataTable } from "@/components/data-table/data-table";
import { SensorRecord as Record } from "@/lib/static/types";
import { generateMonitoringColumns } from "@/lib/config/data-table";
import { Button } from "@/components/ui/button";
import { exportDataToCSV } from "@/lib/utils";

type MonitoringLogActivityProps = { setDate: (date: string) => void, filteredRecords: Record[] }

export default function MonitoringLogActivity({ setDate, filteredRecords }: MonitoringLogActivityProps) {
    return (
        <Card className={'flex-1'}>
            <CardHeader className={'flex flex-col gap-2 md:flex-row md:gap-0 w-full justify-between'}>
                <div className="grid gap-1">
                    <CardTitle className={'text-sm md:text-2xl'}>Monitoring logs</CardTitle>
                    <CardDescription className={'text-xs md:text-sm'}>Showing logs for the last 24
                        hours</CardDescription>
                </div>
                <div className={'flex items-center gap-2 md:mt-0'}>
                    <DatePickerWithPresets onDateChange={(selectedDate) => setDate(selectedDate.toLocaleDateString())} />
                    <Button onClick={() => {
                        exportDataToCSV(filteredRecords, `monitoring_logs_${filteredRecords[0].datetime.split(' ')[0]}`)
                    }} className="hidden md:block">Export to CSV</Button>
                </div>
            </CardHeader>
            <CardContent>
                <DataTable columns={generateMonitoringColumns(filteredRecords)} data={filteredRecords} />
            </CardContent>
        </Card>
    );
}