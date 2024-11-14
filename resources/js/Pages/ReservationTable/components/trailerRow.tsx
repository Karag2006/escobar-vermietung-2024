import {
    eachDayOfInterval,
    format,
    isAfter,
    isBefore,
    isSameDay,
    lastDayOfMonth,
    parse,
    startOfMonth,
} from "date-fns";

import { CalendarDay } from "./CalendarDay";

import { TrailerItem } from "@/types/trailer";
import { Document, DocumentFunctions } from "@/types/document";
import { TrailerRowHead } from "./TrailerRowHead";

interface RowProps {
    date: Date;
    trailer: TrailerItem;
    documents?: Document[];
    documentFunctions: DocumentFunctions;
}

export const TrailerRow = ({
    date,
    trailer,
    documents,
    documentFunctions,
}: RowProps) => {
    let offerColors = ["bg-yellow-400/40", "bg-yellow-600/40"];
    let offerColorIndex = 0;
    let reservationColors = ["bg-green-400/40", "bg-green-600/40"];
    let reservationColorIndex = 0;
    let contractColors = ["bg-blue-400/40", "bg-blue-600/40"];
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

    return (
        <div className="2xl:flex border-black border">
            <TrailerRowHead trailer={trailer} />

            <div className="flex">
                {listOfDays.map((day) => {
                    let documentsForDay: Document[] = [];
                    if (!sortedDocuments || sortedDocuments.length === 0)
                        // If there is no documents for this trailer every day can be generated without a document List
                        return (
                            <CalendarDay
                                key={
                                    "trailer-" +
                                    trailer.id +
                                    "_day-" +
                                    format(day, "d")
                                }
                                day={day}
                                trailerId={trailer.id}
                            />
                        );
                    // In all other cases, its possible that there are multiple documents for one day.
                    let dayFinished = false;
                    while (!dayFinished && sortedDocuments.length > 0) {
                        // A day is finished if there are no more documents or the current document finishes after this day.

                        if (
                            isBefore(
                                day,
                                parse(
                                    sortedDocuments[0].collect_date,
                                    "dd.MM.yyyy",
                                    new Date()
                                )
                            )
                        )
                            // If the first document is after the current day, no document is added to the current day
                            return (
                                <CalendarDay
                                    key={
                                        "trailer-" +
                                        trailer.id +
                                        "_day-" +
                                        format(day, "d")
                                    }
                                    day={day}
                                    trailerId={trailer.id}
                                />
                            );

                        if (
                            isSameDay(
                                day,
                                parse(
                                    sortedDocuments[0].collect_date,
                                    "dd.MM.yyyy",
                                    new Date()
                                )
                            )
                        ) {
                            // If the document starts on this day, it is added to the list of documents for this day

                            // 04.11.2024 Feature: Month List
                            // Color for document Markers is now based on the current state of the document
                            // List of colors for each document type are defined above.
                            sortedDocuments[0].added = true;
                            if (sortedDocuments[0].current_state === "offer") {
                                sortedDocuments[0].colorClass =
                                    offerColors[
                                        offerColorIndex % offerColors.length
                                    ];
                                offerColorIndex++;
                            }

                            if (
                                sortedDocuments[0].current_state ===
                                "reservation"
                            ) {
                                sortedDocuments[0].colorClass =
                                    reservationColors[
                                        reservationColorIndex %
                                            reservationColors.length
                                    ];
                                reservationColorIndex++;
                            }
                            if (
                                sortedDocuments[0].current_state === "contract"
                            ) {
                                sortedDocuments[0].colorClass =
                                    contractColors[
                                        contractColorIndex %
                                            contractColors.length
                                    ];
                                contractColorIndex++;
                            }

                            documentsForDay.push(sortedDocuments[0]);
                            if (
                                isSameDay(
                                    day,
                                    parse(
                                        sortedDocuments[0].return_date,
                                        "dd.MM.yyyy",
                                        new Date()
                                    )
                                )
                            ) {
                                // If the document ends on this day, it is removed from the list of documents
                                sortedDocuments.shift();
                            } else {
                                // If the document does not end on this day, the day is finished
                                dayFinished = true;
                            }
                        } else if (
                            isAfter(
                                day,
                                parse(
                                    sortedDocuments[0].collect_date,
                                    "dd.MM.yyyy",
                                    new Date()
                                )
                            )
                        ) {
                            // If the document starts before this day, and was not removed from the list yet, it is added to the list of documents for this day
                            documentsForDay.push(sortedDocuments[0]);
                            if (!sortedDocuments[0].colorClass) {
                                // 04.11.2024 Feature: Month List
                                // Color for document Markers is now based on the current state of the document
                                // List of colors for each document type are defined above.
                                if (
                                    sortedDocuments[0].current_state === "offer"
                                ) {
                                    sortedDocuments[0].colorClass =
                                        offerColors[
                                            offerColorIndex % offerColors.length
                                        ];
                                    offerColorIndex++;
                                }

                                if (
                                    sortedDocuments[0].current_state ===
                                    "reservation"
                                ) {
                                    sortedDocuments[0].colorClass =
                                        reservationColors[
                                            reservationColorIndex %
                                                reservationColors.length
                                        ];
                                    reservationColorIndex++;
                                }
                                if (
                                    sortedDocuments[0].current_state ===
                                    "contract"
                                ) {
                                    sortedDocuments[0].colorClass =
                                        contractColors[
                                            contractColorIndex %
                                                contractColors.length
                                        ];
                                    contractColorIndex++;
                                }
                            }

                            if (
                                isSameDay(
                                    day,
                                    parse(
                                        sortedDocuments[0].return_date,
                                        "dd.MM.yyyy",
                                        new Date()
                                    )
                                )
                            ) {
                                // If the document ends on this day, it is removed from the list of documents
                                sortedDocuments.shift();
                            } else {
                                // If the document does not end on this day, the day is finished
                                dayFinished = true;
                            }
                        }
                        return (
                            <CalendarDay
                                key={
                                    "trailer-" +
                                    trailer.id +
                                    "_day-" +
                                    format(day, "d")
                                }
                                day={day}
                                trailerId={trailer.id}
                                documents={documentsForDay}
                                documentFunctions={documentFunctions}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};
