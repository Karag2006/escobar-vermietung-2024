import { getDaysInMonth, parse } from "date-fns";

import { TrailerRow } from "./trailerRow";

import { Document } from "@/types/document";
import { TrailerItem } from "@/types/trailer";

interface TableProps {
    date: Date;
    reservationList: Document[];
    trailers: TrailerItem[];
}

export const Table = ({ date, reservationList, trailers }: TableProps) => {
    const documentList = reservationList.map((doc) => {
        doc.collectTimestamp = parse(
            doc.collect_date + " " + doc.collect_time,
            "dd.MM.yyyy HH:mm",
            new Date()
        );
        doc.returnTimestamp = parse(
            doc.return_date + " " + doc.return_time,
            "dd.MM.yyyy HH:mm",
            new Date()
        );
        return doc;
    });

    return (
        <div className="flex flex-col gap-4">
            {trailers.map((trailer) => (
                <TrailerRow
                    key={"trailer-" + trailer.id}
                    date={date}
                    trailer={trailer}
                    documents={documentList.filter(
                        (doc) => doc.vehicle_id === trailer.id
                    )}
                />
            ))}
        </div>
    );
};
