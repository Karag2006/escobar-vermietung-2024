import { cn } from "@/lib/utils";
import { Document } from "@/types/document";
import { TrailerItem } from "@/types/trailer";
import { eachDayOfInterval, format, getDaysInMonth } from "date-fns";

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
                <div className="flex border-black border pl-2">
                    <div className="w-[10rem]">{trailer.title}</div>
                    <div className="w-[7rem]">{trailer.plateNumber}</div>
                    {listOfDays.map((day) => (
                        <div
                            className={cn(
                                "w-9 border-black border text-center",
                                "trailer-" + trailer.id,
                                "day-" + day
                            )}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
