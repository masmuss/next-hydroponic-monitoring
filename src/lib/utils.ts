import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Record} from "@/lib/static/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function mapDeviceRecordToObject(records: Record[]) {
    let phMap = records.map((record: Record) => ({
        time: record.datetime,
        ph: record.ph,
    }))

    let tempMap = records.map((record: Record) => ({
        time: record.datetime,
        temp: record.temp,
    }))

    let humMap = records.map((record: Record) => ({
        time: record.datetime,
        hum: record.hum,
    }))

    let tdsMap = records.map((record: Record) => ({
        time: record.datetime,
        tds: record.tds,
    }))

    return {
        phMap,
        tempMap,
        humMap,
        tdsMap
    }
}

export function getHour(value: string) {
    return new Date(value).toLocaleTimeString('id-ID', {
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
        const hum: number = getRandomNumber(20, 50);
        const ph: number = getRandomNumber(4, 14, true);
        const tds: number = getRandomNumber(100, 1000);

        records.push({datetime, temp, hum, ph, tds});
    }

    return records;
}

function getRandomNumber(min: number, max: number, isFloat: boolean = false): number {
    const rand: number = Math.random() * (max - min) + min;
    return isFloat ? parseFloat(rand.toFixed(1)) : Math.floor(rand);
}
