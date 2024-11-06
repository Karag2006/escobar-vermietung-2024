import { useEffect, useState } from "react";
import { getYear, setYear } from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/Components/ui/button";

interface YearListProps {
    selectedDate: Date;
    displayDate: Date;
    onlyFuture: boolean;
    intervalSize: number;
    changeMode: (mode: string) => void;
    updateDate: (date: Date) => void;
}

export const YearList = ({
    selectedDate,
    displayDate,
    onlyFuture,
    intervalSize,
    changeMode,
    updateDate,
}: YearListProps) => {
    const [yearsList, setYearsList] = useState<number[]>([]);

    const currentYear = getYear(new Date());

    const setNewYear = (year: number) => {
        updateDate(setYear(displayDate, year));
        changeMode("month");
    };

    const classList = (year: number) => {
        let classes = [];
        if (year === currentYear) classes.push("current");
        if (year === getYear(selectedDate)) classes.push("selected");
        return classes.join(" ");
    };

    useEffect(() => {
        let list = [];
        if (!onlyFuture) {
            for (let x = currentYear - intervalSize; x < currentYear; x++) {
                list.push(x);
            }
        }
        for (let x = currentYear; x <= currentYear + intervalSize; x++) {
            list.push(x);
        }
        setYearsList(list);

        return () => {};
    }, [displayDate]);

    return (
        <div className="year-list grid grid-cols-1 gap-1 overflow-y-scroll mt-4 px-3 min-h-[15.25rem] max-h-[20rem]">
            {yearsList.map((year) => (
                <div key={year} className="grid place-items-center w-full h-12">
                    <Button
                        variant="borderless"
                        className={cn(
                            "w-full h-full rounded-none",
                            classList(year)
                        )}
                        onClick={() => setNewYear(year)}
                    >
                        {year}
                    </Button>
                </div>
            ))}
        </div>
    );
};
