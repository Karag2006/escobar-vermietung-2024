import { getDaysInMonth } from "date-fns";

import { TrailerRow } from "./trailerRow";

import { Document } from "@/types/document";
import { TrailerItem } from "@/types/trailer";

interface TableProps {
    date: Date;
    reservationList: Document[];
    trailers: TrailerItem[];
}

export const Table = ({ date, reservationList, trailers }: TableProps) => {
    let listOfDays = [];
    const numberOfDays = getDaysInMonth(date);

    for (let index = 1; index <= numberOfDays; index++) {
        listOfDays.push(index);
    }
    return (
        <div className="flex flex-col gap-4">
            {trailers.map((trailer) => (
                <TrailerRow
                    date={date}
                    trailer={trailer}
                    // reservationList={reservationList}
                />
            ))}
        </div>
    );
};
