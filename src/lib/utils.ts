import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { SensorMappedData, SensorStats } from "@/lib/static/types"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function calculateMappedSensorStats(data: SensorMappedData[], sensorKey: string): SensorStats {
    if (!Array.isArray(data) || data.length === 0) {
        return { min: 0, max: 0, average: 0 };
    }

    const values = data
        .map((item) => item[sensorKey])
        .filter((val): val is number => typeof val === "number" && !isNaN(val)) as number[]; // 💡 Konversi aman ke number[]

    if (values.length === 0) {
        return { min: 0, max: 0, average: 0 };
    }

    return {
        min: Math.min(...values),
        max: Math.max(...values),
        average: values.reduce((sum, val) => sum + val, 0) / values.length
    };
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

export function exportDataToCSV(data: SensorMappedData[], worksheetName: string = "data") {
    const convertToCSV = (objArray: SensorMappedData[]) => {
        if (!Array.isArray(objArray) || objArray.length === 0) return "";

        let str: string = '';

        // Ambil semua kunci dari objek pertama, lalu lewati kolom kedua
        const keys = Object.keys(objArray[0]);
        const filteredKeys = keys.filter((_, index) => index !== 1); // Skip kolom kedua

        // Tambahkan header
        str += filteredKeys.join(",") + "\r\n";

        // Tambahkan isi data
        objArray.forEach((row) => {
            const rowData = filteredKeys.map(key => row[key]).join(",");
            str += rowData + "\r\n";
        });

        return str;
    };

    const csvData = new Blob([convertToCSV(data)], { type: 'text/csv;charset=utf-8;' });
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', `${worksheetName}.csv`);
    tempLink.click();
}

