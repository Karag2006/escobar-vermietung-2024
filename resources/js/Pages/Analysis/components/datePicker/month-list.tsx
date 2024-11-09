import { isSameMonth, setMonth } from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/Components/ui/button";

interface MonthListProps {
    displayDate: Date;
    selectedDate: Date;
    updateDate: (date: Date) => void;
    changeMode: (mode: string) => void;
}

type MonthItem = {
    name: string;
    id: number;
};

export const MonthList = ({
    displayDate,
    selectedDate,
    updateDate,
    changeMode,
}: MonthListProps) => {
    const monthList: MonthItem[] = [
        { name: "Jan.", id: 0 },
        { name: "Feb.", id: 1 },
        { name: "März", id: 2 },
        { name: "Apr.", id: 3 },
        { name: "Mai", id: 4 },
        { name: "Jun.", id: 5 },
        { name: "Jul.", id: 6 },
        { name: "Aug.", id: 7 },
        { name: "Sep.", id: 8 },
        { name: "Okt.", id: 9 },
        { name: "Nov.", id: 10 },
        { name: "Dez.", id: 11 },
    ];

    const classList = (month: MonthItem) => {
        const temp = setMonth(displayDate, month.id);
        let classes = [];
        if (isSameMonth(temp, new Date())) classes.push("current");
        if (isSameMonth(temp, selectedDate)) classes.push("selected");
        return classes.join(" ");
    };

    const setNewMonth = (month: MonthItem) => {
        updateDate(setMonth(displayDate, month.id));
        changeMode("calendar");
    };
    return (
        <div className="month-list grid grid-cols-3 gap-4 my-4 px-3 min-h-[15.25rem]">
            {monthList.map((month) => (
                <div key={month.id} className="grid place-items-center">
                    <Button
                        variant="borderless"
                        className={cn("", classList(month))}
                        onClick={() => setNewMonth(month)}
                    >
                        {month.name}
                    </Button>
                </div>
            ))}
        </div>
    );
};
