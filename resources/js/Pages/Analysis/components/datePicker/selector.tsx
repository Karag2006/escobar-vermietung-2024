import { format, subMonths, addMonths, subYears, addYears } from "date-fns";
import { de } from "date-fns/locale/de";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/Components/ui/button";

const options = { locale: de };

interface SelectorProps {
    mode: string;
    date: Date;
    changeMode: (mode: string) => void;
    setDate: (date: Date) => void;
}

export const Selector = ({
    mode,
    date,
    changeMode,
    setDate,
}: SelectorProps) => {
    const selectPreviousMonth = () => {
        setDate(subMonths(date, 1));
    };
    const selectNextMonth = () => {
        setDate(addMonths(date, 1));
    };

    const selectPreviousYear = () => {
        setDate(subYears(date, 1));
    };

    const selectNextYear = () => {
        setDate(addYears(date, 1));
    };
    return (
        <div className="flex justify-between items-center px-12 py-1">
            {mode === "calendar" && (
                <>
                    <Button variant="borderless" onClick={selectPreviousMonth}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="borderless"
                        className="borderless text-lg"
                        onClick={() => changeMode("month")}
                    >
                        {date ? format(date, "MMMM yyyy", options) : ""}
                    </Button>
                    <Button variant="borderless" onClick={selectNextMonth}>
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </>
            )}
            {mode === "month" && (
                <>
                    <Button variant="borderless" onClick={selectPreviousYear}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="borderless"
                        onClick={() => changeMode("year")}
                    >
                        {date ? format(date, "yyyy", options) : ""}
                    </Button>
                    <Button variant="borderless" onClick={selectNextYear}>
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </>
            )}
        </div>
    );
};
