import { useEffect, useState } from "react";
import {
    format,
    isSameDay,
    eachDayOfInterval,
    startOfMonth,
    endOfMonth,
    getISODay,
} from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/Components/ui/button";

interface CalendarProps {
    selectedDate: Date;
    displayDate: Date;
    updateDate: (date: Date) => void;
}

const dayTitles = ["M", "D", "M", "D", "F", "S", "S"];

export const Calendar = ({
    selectedDate,
    displayDate,
    updateDate,
}: CalendarProps) => {
    const today = new Date();

    const dayClasses = (day: Date) => {
        let classes = "";
        if (isSameDay(day, today)) classes += "today ";
        if (isSameDay(day, selectedDate)) classes += "selected ";
        return classes;
    };

    const [selectedMonthCalendar, setSelectedMonthCalendar] = useState<
        (Date | null)[]
    >([]);

    useEffect(() => {
        if (displayDate) {
            let daysInMonth: (Date | null)[] = eachDayOfInterval({
                start: startOfMonth(displayDate),
                end: endOfMonth(displayDate),
            });

            // to start at the correct day of the week position, fill monday till startOfMonth with "null"
            if (daysInMonth[0]) {
                const fillCount = getISODay(daysInMonth[0]) - 1;
                for (let x = 0; x < fillCount; x++) {
                    // add null to the front of the array
                    daysInMonth.unshift(null);
                }
            }

            // fill as well till the end of the last week of the month.
            const endFill = 7 - getISODay(endOfMonth(displayDate));
            for (let x = 0; x < endFill; x++) {
                // add null to the end of the array
                daysInMonth.push(null);
            }

            setSelectedMonthCalendar(daysInMonth);
        }
    }, [displayDate]);

    return (
        <div className="calendar grid grid-cols-7 px-3 pb-3 min-h-48">
            {dayTitles.map((title, index) => (
                <div
                    key={index}
                    className="grid place-items-center font-semibold text-gray-800"
                >
                    {title}
                </div>
            ))}
            {selectedMonthCalendar.map((day, index) => (
                <div key={index} className="place-items-center grid">
                    {day ? (
                        <Button
                            variant="borderless"
                            className={cn("", dayClasses(day))}
                            onClick={() => updateDate(day)}
                        >
                            {day ? format(day, "d") : ""}
                        </Button>
                    ) : null}
                </div>
            ))}
        </div>
    );
};
