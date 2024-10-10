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
    return (
        <div className="flex flex-col gap-4">
            {trailers.map((trailer) => (
                <TrailerRow
                    key={"trailer-" + trailer.id}
                    date={date}
                    trailer={trailer}
                    documents={reservationList.filter(
                        (doc) => doc.vehicle_id === trailer.id
                    )}
                />
            ))}
        </div>
    );
};
