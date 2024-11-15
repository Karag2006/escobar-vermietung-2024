import {
    eachDayOfInterval,
    format,
    isAfter,
    isBefore,
    isFirstDayOfMonth,
    isSameDay,
    lastDayOfMonth,
    startOfMonth,
} from "date-fns";

import { CalendarDay } from "./CalendarDay";

import { TrailerItem } from "@/types/trailer";
import { Document, DocumentFunctions } from "@/types/document";
import { TrailerRowHead } from "./TrailerRowHead";
import { useEffect, useState } from "react";
import { is } from "date-fns/locale";

interface RowProps {
    date: Date;
    trailer: TrailerItem;
    documents?: Document[];
    documentFunctions: DocumentFunctions;
}

export type Day = {
    date: Date;
    documents: Document[];
    trailerId: number;
};

export const TrailerRow = ({
    date,
    trailer,
    documents,
    documentFunctions,
}: RowProps) => {
    let offerColors = ["bg-yellow-400/40", "bg-yellow-800/40"];
    let offerColorIndex = 0;
    let reservationColors = ["bg-green-400/40", "bg-green-800/40"];
    let reservationColorIndex = 0;
    let contractColors = ["bg-blue-400/40", "bg-blue-800/50"];
    let contractColorIndex = 0;

    let listOfDays = eachDayOfInterval({
        start: startOfMonth(date),
        end: lastDayOfMonth(date),
    });

    let sortedDocuments = documents?.sort((a, b) => {
        if (!a.collectTimestamp || !b.collectTimestamp) {
            return 0;
        }
        return a.collectTimestamp < b.collectTimestamp ? -1 : 1;
    });

    const [days, setDays] = useState<Day[]>([]);

    const selectDocumentColor = (document: Document) => {
        if (document.current_state === "offer") {
            offerColorIndex++;
            return offerColors[offerColorIndex % offerColors.length];
        }
        if (document.current_state === "reservation") {
            reservationColorIndex++;
            return reservationColors[
                reservationColorIndex % reservationColors.length
            ];
        }
        if (document.current_state === "contract") {
            contractColorIndex++;
            return contractColors[contractColorIndex % contractColors.length];
        }
        return "";
    };

    const getDaysData = () => {
        let localDays: Day[] = [];

        listOfDays.forEach((day) => {
            localDays.push({
                date: day,
                documents: [],
                trailerId: trailer.id ? trailer.id : 0,
            });
        });

        if (!sortedDocuments || sortedDocuments.length === 0) {
            setDays(localDays);
            return;
        }

        let localSortedDocuments = [...sortedDocuments];
        // Wann muss ein Dokument in die Lsite des Tages eingefügt werden?
        // - Das Dokument beginnt an diesem Tag.
        // - Das Dokument endet an diesem Tag.
        // - Das Dokument beginnt vor diesem Tag und endet nach diesem Tag.

        localDays.forEach((dayObject) => {
            localSortedDocuments.forEach((document) => {
                if (
                    isSameDay(
                        dayObject.date,
                        document.collectTimestamp
                            ? document.collectTimestamp
                            : new Date()
                    ) ||
                    isSameDay(
                        dayObject.date,
                        document.returnTimestamp
                            ? document.returnTimestamp
                            : new Date()
                    ) ||
                    (isAfter(
                        dayObject.date,
                        document.collectTimestamp
                            ? document.collectTimestamp
                            : new Date()
                    ) &&
                        isBefore(
                            dayObject.date,
                            document.returnTimestamp
                                ? document.returnTimestamp
                                : new Date()
                        ))
                ) {
                    if (
                        isSameDay(
                            dayObject.date,
                            document.collectTimestamp
                                ? document.collectTimestamp
                                : new Date()
                        ) ||
                        isFirstDayOfMonth(dayObject.date)
                    )
                        document.colorClass = selectDocumentColor(document);

                    dayObject.documents.push(document);
                }
            });
        });
        setDays(localDays);
        return;
    };

    useEffect(() => {
        getDaysData();
    }, []);
    return (
        <div className="2xl:flex border-black border">
            <TrailerRowHead trailer={trailer} />

            <div className="flex">
                {days.map((day) => {
                    return (
                        <CalendarDay
                            key={
                                "trailer-" +
                                trailer.id +
                                "_day-" +
                                format(day.date, "d")
                            }
                            day={day.date}
                            trailerId={day.trailerId}
                            documents={day.documents}
                            documentFunctions={documentFunctions}
                        />
                    );
                })}
            </div>
        </div>
    );
};
