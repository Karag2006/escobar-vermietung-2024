import { cn } from "@/lib/utils";
import { Document, DocumentFunctions } from "@/types/document";
import { CalendarDayTimeSlot } from "./CalendarDayTimeSlot";
import {
    isAfter,
    isBefore,
    parse,
    isWithinInterval,
    startOfDay,
    endOfDay,
} from "date-fns";
import { is } from "date-fns/locale";

interface CalendarDayOverlayProps {
    day: Date;
    isHoliday?: boolean;
    isWeekend?: boolean;
    documents?: Document[];
    documentFunctions?: DocumentFunctions;
}

export const CalendarDayOverlay = ({
    day,
    isHoliday,
    isWeekend,
    documents,
    documentFunctions,
}: CalendarDayOverlayProps) => {
    const dayStart = startOfDay(day);
    const divideTimeOne = parse("10:00", "HH:mm", new Date(day));
    const divideTimeTwo = parse("16:00", "HH:mm", new Date(day));
    const dayEnd = endOfDay(day);
    const intervalOne = { start: dayStart, end: divideTimeOne };
    const intervalTwo = { start: divideTimeOne, end: divideTimeTwo };
    const intervalThree = { start: divideTimeTwo, end: dayEnd };

    // mögliche Situationen:
    //  - 3 Dokumente an einem Tag:
    //      - alle 3 TimeSlots sind belegt -> alle 3 TimeSlots mit unterschiedlichen Farben anzeigen
    //  - 2 Dokumente an einem Tag:
    //      - mindestens 2 TimeSlots sind belegt ->
    //      - herausfinden, welche TimeSlots belegt sind und diese mit unterschiedlichen Farben anzeigen
    //  - 1 Dokument an einem Tag:
    //      -mindestens 1 TimeSlot ist belegt ->
    //      - herausfinden, welche TimeSlots belegt sind und diese mit einer Farbe anzeigen
    //  - kein Dokument an einem Tag:
    //      - kein TimeSlot ist belegt

    // Slot Belegungen:
    //  - 1: bis 10:00
    //  - 2: 10:00 bis 16:00
    //  - 3: ab 16:00

    //  if (!documents) -> kein Dokument an diesem Tag
    //  if (documents.length === 3) -> 3 Dokumente an diesem Tag =>
    //    - documents[0] -> TimeSlot 1
    //    - documents[1] -> TimeSlot 2
    //    - documents[2] -> TimeSlot 3
    //  ansonsten betrachten wir die Timeslots einzeln:
    //  wir berechnen zunächst abhol und rückgabe Zeitpunkte als instanzen von Date,
    //  damit wir diese als eine Einheit vergleichen können
    //  Timeslot 1:
    //  nur documents[0] kann TimeSlot 1 belegen,
    //  da documents[0] entweder das einzige Dokument ist oder von 2 Dokumenten das frühere.
    //  => Timeslot 1 ist belegt falls documents[0].collect <= divideTimeOne
    //  Timeslot 2 ist belegt falls:
    //    - documents[0].collect <= divideTimeTwo && documents[0].return > divideTimeOne
    //    - documents[1].collect <= divideTimeTwo
    //  Timeslot 3 ist belegt falls:
    //    - documents[0].collect <= end of this day && documents[0].return > divideTimeTwo
    //    || documents[1].collect <= end of this day && documents[1].return > divideTimeTwo
    if (!documents) {
        return (
            <div
                className={cn(
                    "absolute top-0 left-0 flex w-full h-full",
                    isHoliday ? "bg-red-500/15" : "",
                    isWeekend ? "bg-slate-500/15" : ""
                )}
            >
                <CalendarDayTimeSlot />
                <CalendarDayTimeSlot />
                <CalendarDayTimeSlot />
            </div>
        );
    }
    if (documents.length === 3) {
        return (
            <div
                className={cn(
                    "absolute top-0 left-0 flex w-full h-full",
                    isHoliday ? "bg-red-500/15" : "",
                    isWeekend ? "bg-slate-500/15" : ""
                )}
            >
                <CalendarDayTimeSlot
                    first={
                        documents[0].collectTimestamp
                            ? isWithinInterval(
                                  documents[0].collectTimestamp,
                                  intervalOne
                              )
                            : false
                    }
                    document={documents[0]}
                    documentFunctions={documentFunctions}
                />
                <CalendarDayTimeSlot
                    first={
                        documents[1].collectTimestamp
                            ? isWithinInterval(
                                  documents[1].collectTimestamp,
                                  intervalTwo
                              )
                            : false
                    }
                    document={documents[1]}
                    documentFunctions={documentFunctions}
                />
                <CalendarDayTimeSlot
                    first={
                        documents[2].collectTimestamp
                            ? isWithinInterval(
                                  documents[2].collectTimestamp,
                                  intervalThree
                              )
                            : false
                    }
                    document={documents[2]}
                    documentFunctions={documentFunctions}
                />
            </div>
        );
    }
    const firstDocument = documents.length > 0 ? documents[0] : null;
    const secondDocument = documents.length > 1 ? documents[1] : null;

    return (
        <div
            className={cn(
                "absolute top-0 left-0 flex w-full h-full",
                isHoliday ? "bg-red-500/15" : "",
                isWeekend ? "bg-slate-500/15" : ""
            )}
        >
            {firstDocument?.collectTimestamp &&
            isBefore(firstDocument.collectTimestamp, divideTimeOne) ? (
                <CalendarDayTimeSlot
                    first={
                        firstDocument.collectTimestamp
                            ? isWithinInterval(
                                  firstDocument.collectTimestamp,
                                  intervalOne
                              )
                            : false
                    }
                    document={firstDocument}
                    documentFunctions={documentFunctions}
                />
            ) : (
                <CalendarDayTimeSlot />
            )}
            {firstDocument?.collectTimestamp &&
            firstDocument?.returnTimestamp &&
            isBefore(firstDocument.collectTimestamp, divideTimeTwo) &&
            isAfter(firstDocument.returnTimestamp, divideTimeOne) ? (
                <CalendarDayTimeSlot
                    first={
                        firstDocument.collectTimestamp
                            ? isWithinInterval(
                                  firstDocument.collectTimestamp,
                                  intervalTwo
                              )
                            : false
                    }
                    document={firstDocument}
                    documentFunctions={documentFunctions}
                />
            ) : secondDocument?.collectTimestamp &&
              isBefore(secondDocument.collectTimestamp, divideTimeTwo) ? (
                <CalendarDayTimeSlot
                    first={
                        secondDocument.collectTimestamp
                            ? isWithinInterval(
                                  secondDocument.collectTimestamp,
                                  intervalTwo
                              )
                            : false
                    }
                    document={secondDocument}
                    documentFunctions={documentFunctions}
                />
            ) : (
                <CalendarDayTimeSlot />
            )}
            {firstDocument?.collectTimestamp &&
            firstDocument?.returnTimestamp &&
            isBefore(firstDocument.collectTimestamp, dayEnd) &&
            isAfter(firstDocument.returnTimestamp, divideTimeTwo) ? (
                <CalendarDayTimeSlot
                    first={
                        firstDocument.collectTimestamp
                            ? isWithinInterval(
                                  firstDocument.collectTimestamp,
                                  intervalThree
                              )
                            : false
                    }
                    document={firstDocument}
                    documentFunctions={documentFunctions}
                />
            ) : secondDocument?.collectTimestamp &&
              secondDocument?.returnTimestamp &&
              isBefore(secondDocument.collectTimestamp, dayEnd) &&
              isAfter(secondDocument.returnTimestamp, divideTimeTwo) ? (
                <CalendarDayTimeSlot
                    first={
                        secondDocument.collectTimestamp
                            ? isWithinInterval(
                                  secondDocument.collectTimestamp,
                                  intervalThree
                              )
                            : false
                    }
                    document={secondDocument}
                    documentFunctions={documentFunctions}
                />
            ) : (
                <CalendarDayTimeSlot />
            )}
        </div>
    );
};
