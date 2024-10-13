import {
    eachDayOfInterval,
    format,
    isAfter,
    isBefore,
    isSameDay,
    isWithinInterval,
    lastDayOfMonth,
    parse,
    startOfMonth,
} from "date-fns";

import { CalendarDay } from "./CalendarDay";

import { TrailerItem } from "@/types/trailer";
import { Document } from "@/types/document";
import { log } from "console";
interface RowProps {
    date: Date;
    trailer: TrailerItem;
    documents?: Document[];
}

export const TrailerRow = ({ date, trailer, documents }: RowProps) => {
    let listOfColorClasses = [
        "bg-red-500",
        "bg-green-500",
        "bg-indigo-500",
        "bg-pink-500",
        "bg-blue-500",
        "bg-yellow-500",
        "bg-purple-500",
    ];
    let colorClassIndex = Math.floor(Math.random() * listOfColorClasses.length);
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
        <div className="2xl:flex border-black border pl-2">
            <div className="w-[17rem] flex">
                <div className="w-[10rem] text-ellipsis">{trailer.title}</div>
                <div className="w-[7rem] text-ellipsis">
                    {trailer.plateNumber}
                </div>
            </div>
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
                            sortedDocuments[0].added = true;
                            sortedDocuments[0].colorClass =
                                listOfColorClasses[
                                    colorClassIndex % listOfColorClasses.length
                                ];
                            colorClassIndex++;
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
                                sortedDocuments[0].colorClass =
                                    listOfColorClasses[
                                        colorClassIndex %
                                            listOfColorClasses.length
                                    ];
                                colorClassIndex++;
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
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};
