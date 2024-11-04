import Holidays from "date-holidays";
import { format, isWeekend, isToday } from "date-fns";

import { cn } from "@/lib/utils";
import { Document, DocumentFunctions } from "@/types/document";
import { CalendarDayOverlay } from "./CalendarDayOverlay";

interface CalendarDayProps {
    day: Date;
    trailerId?: number | null;
    documents?: Document[];
    documentFunctions?: DocumentFunctions;
}

export const CalendarDay = ({
    day,
    trailerId,
    documents,
    documentFunctions,
}: CalendarDayProps) => {
    const hd = new Holidays("DE", "RP");
    const holiday = hd.isHoliday(day);
    const isHoliday = holiday && holiday[0].type === "public" ? true : false;

    const dayNumber = format(day, "d");

    return (
        <div
            className={cn(
                "relative w-9 border-black border text-center",
                "trailer-" + trailerId,
                "day-" + dayNumber,
                isToday(day) ? "font-bold" : null
            )}
        >
            {dayNumber}

            <CalendarDayOverlay
                day={day}
                documents={documents}
                isHoliday={isHoliday}
                isWeekend={isWeekend(day)}
                documentFunctions={documentFunctions}
            />
        </div>
    );
};
