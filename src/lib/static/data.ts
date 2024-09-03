import {Record} from "@/lib/static/types";
import {generateRandomMonitoringData} from "@/lib/utils";

const monitoringResults: Record[] = generateRandomMonitoringData('2024-08-20T00:00:00Z', 20);

const temperatureResults = monitoringResults.map((result) => ({
    time: result.datetime,
    temp: result.temp,
}))

const phResults = monitoringResults.map((result) => ({
    time: result.datetime,
    ph: result.ph,
}))

const tdsResults = monitoringResults.map((result) => ({
    time: result.datetime,
    tds: result.tds,
}))

const humidityResults = monitoringResults.map((result) => ({
    time: result.datetime,
    hum: result.hum,
}))

export {monitoringResults, temperatureResults, phResults, tdsResults, humidityResults}