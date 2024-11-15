import { getDaysInMonth, parse, parseISO, parseJSON } from "date-fns";
import { UTCDate } from "@date-fns/utc";

import { TrailerRow } from "./trailerRow";

import { Document, DocumentFunctions } from "@/types/document";
import { TrailerItem } from "@/types/trailer";

interface TableProps {
    date: Date;
    reservationList: Document[];
    trailers: TrailerItem[];
    documentFunctions: DocumentFunctions;
}

export const Table = ({
    date,
    reservationList,
    trailers,
    documentFunctions,
}: TableProps) => {
    const documentList = reservationList.map((doc) => {
        doc.collectTimestamp = new Date(doc.collect_at ? doc.collect_at : "");
        doc.returnTimestamp = new Date(doc.return_at ? doc.return_at : "");
        return doc;
    });

    return (
        <div className="flex flex-col gap-6">
            {trailers.map((trailer) => (
                <TrailerRow
                    key={"trailer-" + trailer.id}
                    date={date}
                    trailer={trailer}
                    documents={documentList.filter(
                        (doc) => doc.vehicle_id === trailer.id
                    )}
                    documentFunctions={documentFunctions}
                />
            ))}
        </div>
    );
};
