import { eachDayOfInterval, lastDayOfMonth, startOfMonth } from "date-fns";

import { CalendarDay } from "./CalendarDay";

import { TrailerItem } from "@/types/trailer";

interface RowProps {
    date: Date;
    trailer: TrailerItem;
}

export const TrailerRow = ({ date, trailer }: RowProps) => {
    let listOfDays = eachDayOfInterval({
        start: startOfMonth(date),
        end: lastDayOfMonth(date),
    });

    return (
        <div className="flex border-black border pl-2">
            <div className="w-[10rem]">{trailer.title}</div>
            <div className="w-[7rem]">{trailer.plateNumber}</div>
            {listOfDays.map((day) => (
                <CalendarDay day={day} trailerId={trailer.id} />
            ))}
        </div>
    );
};
