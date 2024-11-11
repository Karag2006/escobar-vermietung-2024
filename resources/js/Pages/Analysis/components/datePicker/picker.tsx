// expects instance of Date() in "value" prop, emits instance of Date()
// uses date-fns for all internal date related functionality
// uses German locale for displaying dates.

// uses custom classes to apply some tailwind classes
// see resources/scss/imports/components/_date-picker.scss

import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale/de";

import { Button } from "@/Components/ui/button";

import { Selector } from "./selector";
import { Calendar } from "./calendar";
import { MonthList } from "./month-list";
import { YearList } from "./year-list";

interface PickerProps {
    value: Date;
    pickerStyle?: string;
    onPickDate: (date: Date) => void;
    onClickOutside: () => void;
}

const options = { locale: de };

export const Picker = ({
    value,
    pickerStyle,
    onPickDate,
    onClickOutside,
}: PickerProps) => {
    const ref = useRef<null | HTMLDivElement>(null);

    const [selectedDate, setSelectedDate] = useState(value);
    const [displayDate, setDisplayDate] = useState<Date>(value);
    const [mode, setMode] = useState(
        pickerStyle === "month" ? "month" : "calendar"
    );

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        onPickDate(date);
    };

    const showSelectedDate = () => {
        if (mode !== "calendar") setMode("calendar");
    };

    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            if (
                ref.current &&
                e.target instanceof Element &&
                !ref.current.contains(e.target)
            ) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [onClickOutside]);

    return (
        <div
            ref={ref}
            className="absolute top-10 left-0 z-10 min-w-[320px] bg-gray-100 shadow-md"
        >
            <div className="date-picker-head p-4 bg-primary text-gray-100">
                <div className="text-gray-100/60">
                    <Button
                        variant="borderless"
                        className="text-lg"
                        onClick={() => setMode("year")}
                    >
                        {selectedDate ? format(selectedDate, "yyyy") : ""}
                    </Button>
                </div>
                {pickerStyle === "month" ? (
                    <div className="">
                        <Button
                            variant="borderless"
                            className="text-2xl"
                            onClick={() => setMode("month")}
                        >
                            {selectedDate
                                ? format(selectedDate, "MMM", options)
                                : ""}
                        </Button>
                    </div>
                ) : (
                    <div className="">
                        <Button
                            variant="borderless"
                            className="text-2xl"
                            onClick={showSelectedDate}
                        >
                            {selectedDate
                                ? format(selectedDate, "eee, dd. MMM", options)
                                : ""}
                        </Button>
                    </div>
                )}
            </div>
            <div className="card--body">
                <Selector
                    mode={mode}
                    changeMode={setMode}
                    date={displayDate}
                    setDate={setDisplayDate}
                />
                {mode === "calendar" && (
                    <Calendar
                        selectedDate={selectedDate}
                        updateDate={handleDateSelect}
                        displayDate={displayDate}
                    />
                )}
                {mode === "month" && pickerStyle === "month" && (
                    <MonthList
                        selectedDate={selectedDate}
                        displayDate={displayDate}
                        updateDate={handleDateSelect}
                        changeMode={setMode}
                    />
                )}
                {mode === "month" && !(pickerStyle === "month") && (
                    <MonthList
                        selectedDate={selectedDate}
                        displayDate={displayDate}
                        updateDate={setDisplayDate}
                        changeMode={setMode}
                    />
                )}
                {mode === "year" && (
                    <YearList
                        selectedDate={selectedDate}
                        updateDate={setDisplayDate}
                        displayDate={displayDate}
                        changeMode={setMode}
                        onlyFuture={!(pickerStyle === "month")}
                        intervalSize={10}
                    />
                )}
            </div>
        </div>
    );
};
