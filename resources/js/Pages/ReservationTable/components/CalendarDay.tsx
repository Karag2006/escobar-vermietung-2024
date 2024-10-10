import Holidays from "date-holidays";
import { format, isWeekend } from "date-fns";

import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

interface CalendarDayProps {
    day: Date;
    trailerId?: number | null;
}

export const CalendarDay = ({ day, trailerId }: CalendarDayProps) => {
    const hd = new Holidays("DE", "RP");
    const holiday = hd.isHoliday(day);
    const isHoliday = holiday && holiday[0].type === "public" ? true : false;

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
            {isHoliday ? (
                <Tooltip>
                    <TooltipTrigger>
                        <div
                            className={cn(
                                "absolute top-0 left-0 flex w-full h-full",
                                isHoliday ? "bg-red-500/15" : "",
                                isWeekend(day) ? "bg-slate-500/15" : ""
                            )}
                        >
                            <div className="w-full"></div>
                            <div className="w-full"></div>
                            <div className="w-full"></div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{holiday && holiday[0].name}</p>
                    </TooltipContent>
                </Tooltip>
            ) : (
                <div
                    className={cn(
                        "absolute top-0 left-0 flex w-full h-full",
                        isWeekend(day) ? "bg-slate-500/15" : ""
                    )}
                >
                    <div className="w-full"></div>
                    <div className="w-full"></div>
                    <div className="w-full"></div>
                </div>
            )}
        </div>
    );
};
