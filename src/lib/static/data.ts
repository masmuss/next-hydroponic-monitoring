import {Record} from "@/lib/static/types";
import {generateRandomMonitoringData} from "@/lib/utils";

const monitoringResults: Record[] = generateRandomMonitoringData('2024-08-20T00:00:00Z', 20);

const temperatureResults = monitoringResults.map((result) => ({
    time: result.datetime,
    waterTemp: result.water_temp,
}))

const phResults = monitoringResults.map((result) => ({
    time: result.datetime,
    ph: result.ph,
}))

const tankTdsResults = monitoringResults.map((result) => ({
    time: result.datetime,
    tankTds: result.tank_tds,
}))

const fieldTdsResults = monitoringResults.map((result) => ({
    time: result.datetime,
    fieldTds: result.field_tds,
}))

export {monitoringResults, temperatureResults, phResults, tankTdsResults, fieldTdsResults}