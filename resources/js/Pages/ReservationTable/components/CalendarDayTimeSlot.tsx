import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Document } from "@/types/document";

interface CalendarDayTimeSlotProps {
    document?: Document;
}

export const CalendarDayTimeSlot = ({ document }: CalendarDayTimeSlotProps) => {
    if (!document) {
        return <div className={cn("w-full h-full")}></div>;
    }

    return (
        <Tooltip>
            <TooltipTrigger className="w-full">
                <div className={cn("w-full h-full", document.colorClass)}></div>
            </TooltipTrigger>
            <TooltipContent>
                <div>
                    <p>{document.customer_name1}</p>
                </div>
            </TooltipContent>
        </Tooltip>
    );
};
