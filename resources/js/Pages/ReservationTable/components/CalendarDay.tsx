import { format, isWeekend } from "date-fns";

import { cn } from "@/lib/utils";

interface CalendarDayProps {
    day: Date;
    trailerId?: number | null;
}

export const CalendarDay = ({ day, trailerId }: CalendarDayProps) => {
    const dayNumber = format(day, "d");
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
                    isWeekend(day) ? "bg-slate-500/20" : ""
                )}
            >
                <div className="w-full"></div>
                <div className="w-full"></div>
                <div className="w-full"></div>
            </div>
        </div>
    );
};
