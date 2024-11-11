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

    // 04.11.2024 Feature: Month List
    // Color for document Markers is now based on the current state of the document
    // The colorClass is now stored in the document object
    // Color Definitions can be found in "./trailerRow.tsx"
    const documentColorClass = document?.colorClass;

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
