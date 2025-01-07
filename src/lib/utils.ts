import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import * as XLSX from 'xlsx'
import {Record, SensorMappedData, SensorStats} from "@/lib/static/types"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function mapDeviceRecordToObject(records: Record[]) {
    let phMap = records.map((record: Record) => ({
        time: record.datetime,
        ph: record.ph,
    }))

    let waterTempMap = records.map((record: Record) => ({
        time: record.datetime,
        waterTemp: record.water_temp,
    }))

    let tankTdsMap = records.map((record: Record) => ({
        time: record.datetime,
        tankTds: record.tank_tds,
    }))

    let fieldTdsMap = records.map((record: Record) => ({
        time: record.datetime,
        fieldTds: record.field_tds,
    }))

    return {
        phMap,
        waterTempMap,
        tankTdsMap,
        fieldTdsMap
    }
}

export function calculateMappedSensorStats(data: SensorMappedData[], sensorKey: string): SensorStats {
    if (!Array.isArray(data) || data.length === 0) {
        return {
            min: 0,
            max: 0,
            average: 0
        };
    }

    const values = data.map((item) => item[sensorKey]);

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const averageValue = values.reduce((sum, val) => sum + val, 0) / values.length;

    return {
        min: minValue,
        max: maxValue,
        average: averageValue,
    };
}

export function getHour(value: string) {
    const [date, time] = value.split(" ");
    const [year, month, day] = date.split("-");
    const isoFormatDateStr = `${year}-${month}-${day}T${time}`;
    const dateObj = new Date(isoFormatDateStr);

    const isoStringDate = dateObj.toISOString();
    return new Date(isoStringDate).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

export function formatDateDifference(inputDate: string): string {
    const date = new Date(inputDate)
    const currentDate = new Date()
    const timeDifference = currentDate.getTime() - date.getTime()

    const msToTime = (duration: number): string => {
        const seconds = Math.floor((duration / 1000) % 60)
        const minutes = Math.floor((duration / (1000 * 60)) % 60)
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
        const days = Math.floor(duration / (1000 * 60 * 60 * 24))
        const weeks = Math.floor(duration / (1000 * 60 * 60 * 24 * 7))
        const years = Math.floor(duration / (1000 * 60 * 60 * 24 * 365))

        if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`
        if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
        if (seconds > 0) return `${seconds} second${seconds > 1 ? 's' : ''} ago`

        return 'just now'
    }

    return msToTime(timeDifference)
}

export function exportDataToCSV(data: Record[], worksheetName?: string) {
    const convertToCSV = (objArray: any[]) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str: string = '';

        // Add header
        let line: string = '';
        for (let index in array[0]) {
            if (line !== '') line += ','
            line += index;
        }

        for (let i = 0; i < array.length; i++) {
            str += line + '\r\n';
            line = '';
            for (let index in array[i]) {
                if (line !== '') line += ','
                line += array[i][index];
            }
            str += line + '\r\n';
        }

        return str;
    }

    const manipulatedData = data.map((record) => {
        return {
            time: record.datetime.split(' ')[1],
            water_temp: record.water_temp,
            tds: record.tank_tds,
            ph: record.ph,
            ph_range: getPhRange(record.ph),
            tds_range: getTdsRange(record.tank_tds),
            temp_range: getTempRange(record.water_temp)
        }
    })

    const csvData = new Blob([convertToCSV(manipulatedData)], {type: 'text/csv;charset=utf-8;'});
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', `${worksheetName}.csv`);
    tempLink.click();
}

function getPhRange(ph: number): string {
    if (ph < 6) {
        return 'Asam';
    } else if (ph > 7) {
        return 'Basa';
    } else {
        return 'Optimal';
    }
}

function getTdsRange(tds: number): string {
    if (tds < 750) {
        return 'Rendah';
    } else if (tds > 2100) {
        return 'Tinggi';
    } else {
        return 'Optimal';
    }
}

function getTempRange(temp: number): string {
    if (temp < 24) {
        return 'Dingin';
    } else if (temp > 30) {
        return 'Panas';
    } else {
        return 'Optimal';
    }
}

/*
* THIS METHOD IS USED TO GENERATE RANDOM MONITORING DATA
* PLEASE USE THIS DATA ONLY FOR TESTING PURPOSES
* */
export function generateRandomMonitoringData(startDate: string, numRecords: number): Record[] {
    const records: Record[] = [];
    const startDateTime: Date = new Date(startDate);

    for (let i: number = 0; i < numRecords; i++) {
        const datetime: string = new Date(startDateTime.getTime() + i * 30 * 60000).toISOString();

        const temp: number = getRandomNumber(20, 50);
        const ph: number = getRandomNumber(4, 14, true);
        const tds: number = getRandomNumber(100, 1000);

        records.push({datetime, water_temp: temp, tank_tds: tds, ph, field_tds: tds});
    }

    return records;
}

function getRandomNumber(min: number, max: number, isFloat: boolean = false): number {
    const rand: number = Math.random() * (max - min) + min;
    return isFloat ? parseFloat(rand.toFixed(1)) : Math.floor(rand);
}
