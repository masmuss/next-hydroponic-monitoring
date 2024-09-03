"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerWithPresetsProps = {
    onDateChange: (date: Date) => void
}

export default function DatePickerWithPresets(props: DatePickerWithPresetsProps) {
    const { onDateChange } = props
    const [date, setDate] = React.useState<Date>(new Date())

    const handleDateChange = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate)
            onDateChange(new Date(selectedDate.toISOString()))
        }
    }

    React.useEffect(() => {
        onDateChange(date)
    }, [date, onDateChange])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                    <Calendar
                        mode="single"
                        selected={date}
                        disabled={(date) =>
                            date > new Date() || date < new Date("2023-01-01")
                        }
                        onSelect={handleDateChange}
                    />
            </PopoverContent>
        </Popover>
    )
}
