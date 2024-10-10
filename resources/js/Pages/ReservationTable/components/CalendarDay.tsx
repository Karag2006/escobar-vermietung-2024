import { format, isWeekend } from "date-fns";

import { cn } from "@/lib/utils";
import Holidays from "date-holidays";

interface CalendarDayProps {
    day: Date;
    trailerId?: number | null;
}

export const CalendarDay = ({ day, trailerId }: CalendarDayProps) => {
    const hd = new Holidays("DE", "RP");
    const dayNumber = format(day, "d");
    const holiday = hd.isHoliday(day);
    return (
        <div
            className={cn(
                "relative w-9 border-black border text-center",
                "trailer-" + trailerId,
                "day-" + dayNumber
            )}
        >
            {dayNumber}
            <div
                className={cn(
                    "absolute top-0 left-0 flex w-full h-full",
                    holiday && holiday[0].type === "public"
                        ? "bg-red-500/15"
                        : "",
                    isWeekend(day) ? "bg-slate-500/15" : ""
                )}
            >
                <div className="w-full"></div>
                <div className="w-full"></div>
                <div className="w-full"></div>
            </div>
        </div>
    );
};
