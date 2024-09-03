import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import DatePickerWithPresets from "@/components/date-picker";
import {DataTable} from "@/components/data-table";
import {Record} from "@/lib/static/types";
import {monitoringDatatableColumns} from "@/lib/config/data-table";

type MonitoringLogActivityProps = { setDate: (date: string) => void, filteredRecords: Record[] }

export default function MonitoringLogActivity({setDate, filteredRecords}: MonitoringLogActivityProps) {
    return (
        <Card className={'flex-1'}>
            <CardHeader className={'flex flex-row w-full justify-between'}>
                <div className="grid gap-0.5">
                    <CardTitle>Monitoring logs</CardTitle>
                    <CardDescription>Showing logs for the last 24 hours</CardDescription>
                </div>
                <DatePickerWithPresets onDateChange={(selectedDate) => setDate(selectedDate.toISOString())}/>
            </CardHeader>
            <CardContent>
                <DataTable columns={monitoringDatatableColumns} data={filteredRecords}/>
            </CardContent>
        </Card>
    );
}