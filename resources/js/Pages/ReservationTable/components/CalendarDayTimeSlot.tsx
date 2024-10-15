import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { cn } from "@/lib/utils";

import { Document } from "@/types/document";
import { DocumentTooltip } from "./documentTooltip";

interface CalendarDayTimeSlotProps {
    document?: Document;
}

export const CalendarDayTimeSlot = ({ document }: CalendarDayTimeSlotProps) => {
    const markerClass = () => {
        if (document?.current_state === "offer")
            return document?.colorClass + "/20";
        if (document?.current_state === "reservation")
            return document?.colorClass + "/40";
        if (document?.current_state === "contract")
            return document?.colorClass + "/60";
    };
    const documentColorClass = markerClass();

    if (!document) {
        return <div className={cn("w-full h-full")}></div>;
    }

    return (
        <Tooltip>
            <TooltipTrigger className="w-full">
                <div className={cn("w-full h-full", documentColorClass)}></div>
            </TooltipTrigger>
            <TooltipContent>
                <DocumentTooltip document={document} />
            </TooltipContent>
        </Tooltip>
    );
};
