import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import DatePickerWithPresets from "@/components/date-picker";
import {DataTable} from "@/components/data-table";
import {Record} from "@/lib/static/types";
import {monitoringDatatableColumns} from "@/lib/config/data-table";
import {Button} from "@/components/ui/button";
import {exportDataToCSV} from "@/lib/utils";
import {useSelectedDays} from "react-day-picker/src/hooks/useSelectedDays";

type MonitoringLogActivityProps = { setDate: (date: string) => void, filteredRecords: Record[] }

export default function MonitoringLogActivity({setDate, filteredRecords}: MonitoringLogActivityProps) {
    return (
        <Card className={'flex-1'}>
            <CardHeader className={'flex flex-row w-full justify-between'}>
                <div className="grid gap-1">
                    <CardTitle className={'text-sm md:text-2xl'}>Monitoring logs</CardTitle>
                    <CardDescription className={'text-xs md:text-sm'}>Showing logs for the last 24
                        hours</CardDescription>
                </div>
                <div className={'flex items-center gap-2'}>
                    <DatePickerWithPresets onDateChange={(selectedDate) => setDate(selectedDate.toLocaleDateString())}/>
                    <Button onClick={() => {
                        exportDataToCSV(filteredRecords, `monitoring_logs_${filteredRecords[0].datetime.split(' ')[0]}`)
                    }}>Export to CSV</Button>
                </div>
            </CardHeader>
            <CardContent>
                <DataTable columns={monitoringDatatableColumns} data={filteredRecords}/>
            </CardContent>
        </Card>
    );
}