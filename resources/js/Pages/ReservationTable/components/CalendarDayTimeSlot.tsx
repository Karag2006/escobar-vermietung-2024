import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { cn } from "@/lib/utils";

import { Document, DocumentFunctions } from "@/types/document";
import { DocumentTooltip } from "./documentTooltip";
import { WarningMarker } from "./warning-marker";

interface CalendarDayTimeSlotProps {
    first?: boolean;
    document?: Document;
    documentFunctions?: DocumentFunctions;
}

export const CalendarDayTimeSlot = ({
    first,
    document,
    documentFunctions,
}: CalendarDayTimeSlotProps) => {
    // Der Timeslot bekommt nur documentFunctions übergeben, wenn es ein Dokument zum Darstellen gibt.
    // nur dann existiert auch ein Tooltip. => der Tooltip hat immer zugriff auf die documentFunctions.
    // um type errors zu vermeiden senden wir placeholder functions an die nicht existierenden Tooltips ohne documentFunctions.
    const placeholderFunctions = {
        edit: () => {},
        delete: () => {},
        forward: () => {},
    };

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
                <div
                    className={cn("w-full h-full relative", documentColorClass)}
                >
                    {first && document.collect_address.id !== 1 ? (
                        <WarningMarker />
                    ) : null}
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <DocumentTooltip
                    document={document}
                    documentFunctions={
                        documentFunctions
                            ? documentFunctions
                            : placeholderFunctions
                    }
                />
            </TooltipContent>
        </Tooltip>
    );
};
