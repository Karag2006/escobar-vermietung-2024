import { cn } from "@/lib/utils";
import { Document } from "@/types/document";
import { CalendarDay } from "./CalendarDay";
import { CalendarDayTimeSlot } from "./CalendarDayTimeSlot";

interface CalendarDayOverlayProps {
    day: Date;
    isHoliday?: boolean;
    isWeekend?: boolean;
    documents?: Document[];
}

export const CalendarDayOverlay = ({
    day,
    isHoliday,
    isWeekend,
    documents,
}: CalendarDayOverlayProps) => {
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
    //  - 2: 10:00 bis 15:00
    //  - 3: ab 15:00

    //  if (!documents) -> kein Dokument an diesem Tag
    //  if (documents.length === 3) -> 3 Dokumente an diesem Tag =>
    //    - documents[0] -> TimeSlot 1
    //    - documents[1] -> TimeSlot 2
    //    - documents[2] -> TimeSlot 3
    //  if (documents.length === 2) -> 2 Dokumente an diesem Tag =>
    //    documents[0] endet an diesem Tag an TimeSlot 1 oder 2
    //    if (documents[0].return_time <= "10:00") -> TimeSlot 1
    //    if (documents[0].collect_date === this day) && (documents[0].collect_time > "10:00") -> nur Timeslot 2
    //    else -> TimeSlot 1 und 2
    //    documents[1] startet an diesem Tag an TimeSlot 2 oder 3
    //    if (documents[1].collect_time >= "15:00") -> TimeSlot 3
    //    if (documents[1].return_date === this day) && (documents[1].return_time <= "15:00") -> nur TimeSlot 2
    //    else -> TimeSlot 2 und 3
    //  if (documents.length === 1) -> 1 Dokument an diesem Tag =>
    //    if (documents[0].collect_date < this day) => mindestens TimeSlot 1
    //      if (documents[0].return_date > this day) => alle 3 timeSlots
    //      elseif (documents[0].return_time <= "10:00") =>  nur TimeSlot 1
    //      elseif (documents[0].return_time <= "15:00") => TimeSlot 1 und 2
    //      else -> TimeSlot 1, 2 und 3
    //    elseif (documents[0].collect_date === this day)
    //      if (documents[0].return_date > this day)
    //        if (documents[0].collect_time <= "10:00") => TimeSlot 1 bis 3
    //        elseif (documents[0].collect_time <= "15:00") => TimeSlot 2 und 3
    //        else -> TimeSlot 3
    //      elseif (documents[0].return_date === this day)
    //        if (documents[0].collect_time <= "10:00") && (documents[0].return_time <= "10:00") => TimeSlot 1
    //        elseif (documents[0].collect_time <= "10:00") && (documents[0].return_time <= "15:00") => TimeSlot 1 und 2
    //        elseif (documents[0].collect_time <= "10:00") && (documents[0].return_time > "15:00") => TimeSlot 1 bis 3
    //        elseif (documents[0].collect_time <= "15:00") && (documents[0].return_time <= "15:00") => TimeSlot 2
    //        elseif (documents[0].collect_time <= "15:00") && (documents[0].return_time > "15:00") => TimeSlot 2 und 3
    //        else -> TimeSlot 3
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
};
