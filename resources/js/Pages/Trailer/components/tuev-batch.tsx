// Used to display a given date String value "MM/yy" in a colored div
// the div BackgroundColor changes based on
// comparison of the date represented by the string and a given compareDate
// if no compareDate is provided the current Date is used instead.

import {
    format,
    isAfter,
    isBefore,
    isSameMonth,
    isValid,
    parse,
} from "date-fns";

import { cn } from "@/lib/utils";

interface TuevBatchProps {
    tuev?: string | null;
    compareDate?: Date;
}

export const TuevBatch = ({ tuev, compareDate }: TuevBatchProps) => {
    if (!tuev) return null;
    let classes = [];
    let date = new Date();
    if (compareDate) date = compareDate;

    const tuevDate = parse(tuev, "MM/yy", new Date());

    if (isValid(tuevDate)) {
        if (isSameMonth(tuevDate, date)) classes.push("bg-yellow-500");
        else if (isAfter(tuevDate, date)) classes.push("bg-green-600");
        else if (isBefore(tuevDate, date)) classes.push("bg-destructive");
    }

    return (
        <div
            className={cn(
                "flex w-max justify-center py-2 px-4 rounded-2xl",
                classes
            )}
        >
            {format(tuevDate, "MM / yy")}
        </div>
    );
};
