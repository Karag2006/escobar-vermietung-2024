import {
    eachDayOfInterval,
    format,
    isAfter,
    isBefore,
    isFirstDayOfMonth,
    isSameDay,
    lastDayOfMonth,
    parse,
    startOfMonth,
} from "date-fns";

import { CalendarDay } from "./CalendarDay";

import { TrailerItem } from "@/types/trailer";
import { Document, DocumentFunctions } from "@/types/document";
import { TrailerRowHead } from "./TrailerRowHead";
import { useEffect, useState } from "react";

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
        return parse(a.collect_date, "dd.MM.yyyy", new Date()) <
            parse(b.collect_date, "dd.MM.yyyy", new Date())
            ? -1
            : 1;
    });

    const [days, setDays] = useState<Day[]>([]);

    const getDaysData = () => {
        // 14.11.2024 Fix: TrailerRow
        // The TrailerRow now correctly displays the documents in the correct time slot.

        let localDays: Day[] = [];
        // currentDocument ist das aktuell betrachtete Dokument.
        let currentDocument: Document | null = null;

        // Falls es keine Dokumente für den Anhänger gibt erzeugen wir alle Tage ohne Dokumente.
        if (!sortedDocuments || sortedDocuments.length === 0) {
            listOfDays.forEach((day) => {
                localDays.push({
                    date: day,
                    documents: [],
                    trailerId: trailer.id ? trailer.id : 0,
                });
            });
            setDays(localDays);
            return;
        }

        // Andernfalls fügen wir die Dokumente in die Tage ein.
        // Dazu gehen wir alle Tage des Monats durch.
        listOfDays.forEach((day) => {
            // Für jeden Tag erzeugen wir ein Array für die Dokumente des Tages.
            let documentsForDay: Document[] = [];
            let dayFinished = false;
            // Solange der Tag nicht fertig ist, müssen wir prüfen ob weitere Dokumente für den Tag existieren.
            while (!dayFinished) {
                // Wenn es kein aktuelles Dokument gibt, gibt es 3 Möglichkeiten:
                //  - Das letzte Dokument für den Anhänger ist bereits verarbeitet.
                // - Es gibt keine Dokumente(mehr) für den Tag
                // - oder ein neues Dokument beginnt an diesem Tag.
                if (!currentDocument) {
                    // 1. Das letzte Dokument für den Anhänger ist bereits verarbeitet.
                    // In diesem Fall ist der Tag fertig und wir fügen eventuell vorhandene Dokumente für den Tag in die Liste ein.
                    if (!sortedDocuments || sortedDocuments.length === 0) {
                        dayFinished = true;
                        localDays.push({
                            date: day,
                            documents: documentsForDay,
                            trailerId: trailer.id ? trailer.id : 0,
                        });
                    }
                    // 2. Es gibt keine Dokumente(mehr) für den Tag
                    // In diesem Fall ist der Tag fertig und wir fügen eventuell vorhandene Dokumente für den Tag in die Liste ein.
                    if (
                        sortedDocuments &&
                        sortedDocuments.length > 0 &&
                        isBefore(
                            day,
                            parse(
                                sortedDocuments[0].collect_date,
                                "dd.MM.yyyy",
                                new Date()
                            )
                        )
                    ) {
                        dayFinished = true;
                        localDays.push({
                            date: day,
                            documents: documentsForDay,
                            trailerId: trailer.id ? trailer.id : 0,
                        });
                    }
                    // 3. Ein neues Dokument beginnt an diesem Tag.
                    // In diesem Fall :
                    // - setzen wir das Dokument als aktuelles Dokument
                    // - löschen das Dokument aus der Liste der Dokumente für den Anhänger.
                    // - legen die Farbe für das Dokument fest.
                    // - fügen das Dokument in die Liste der Dokumente für den Tag ein.
                    if (
                        (sortedDocuments &&
                            sortedDocuments.length > 0 &&
                            isSameDay(
                                day,
                                parse(
                                    sortedDocuments[0].collect_date,
                                    "dd.MM.yyyy",
                                    new Date()
                                )
                            )) ||
                        (isFirstDayOfMonth(day) &&
                            isAfter(
                                day,
                                parse(
                                    sortedDocuments[0].collect_date,
                                    "dd.MM.yyyy",
                                    new Date()
                                )
                            ))
                    ) {
                        currentDocument = sortedDocuments[0];
                        sortedDocuments.shift();
                        if (currentDocument.current_state === "offer") {
                            currentDocument.colorClass =
                                offerColors[
                                    offerColorIndex % offerColors.length
                                ];
                            offerColorIndex++;
                        }

                        if (currentDocument.current_state === "reservation") {
                            currentDocument.colorClass =
                                reservationColors[
                                    reservationColorIndex %
                                        reservationColors.length
                                ];
                            reservationColorIndex++;
                        }
                        if (currentDocument.current_state === "contract") {
                            currentDocument.colorClass =
                                contractColors[
                                    contractColorIndex % contractColors.length
                                ];
                            contractColorIndex++;
                        }

                        documentsForDay.push(currentDocument);
                    }

                    // Wenn es ein aktuelles Dokument gibt, gibt es 2 Möglichkeiten:
                    // - Das aktuelle Dokument endet an diesem Tag.
                    // - Das aktuelle Dokument endet irgendwann in der Zukunft.
                } else {
                    // 1. Das aktuelle Dokument endet an diesem Tag.
                    // - Das aktuelle Dokument wird zurückgesetzt.
                    // - damit beginnt die schleife von neuem und prüft ob es weitere Dokumente für den Tag gibt.
                    documentsForDay.push(currentDocument);
                    if (
                        isSameDay(
                            day,
                            parse(
                                currentDocument.return_date,
                                "dd.MM.yyyy",
                                new Date()
                            )
                        )
                    ) {
                        currentDocument = null;
                        // 2. Das aktuelle Dokument endet irgendwann in der Zukunft.
                        // - Der Tag wird mit der aktuellen Dokumentenliste beendet.
                    } else {
                        dayFinished = true;
                        localDays.push({
                            date: day,
                            documents: documentsForDay,
                            trailerId: trailer.id ? trailer.id : 0,
                        });
                    }
                }
            }
        });
        setDays(localDays);
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
