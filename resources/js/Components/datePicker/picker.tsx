// expects instance of Date() in "value" prop, emits instance of Date()
// uses date-fns for all internal date related functionality
// uses German locale for displaying dates.
import { format, addMonths, subMonths } from "date-fns";
import { de } from "date-fns/locale/de";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Selector } from "./selector";
import { Calendar } from "./calendar";

interface PickerProps {
    value: Date;
    onPickDate: (date: Date) => void;
    onClickOutside: () => void;
}

const options = { locale: de };

export const Picker = ({ value, onPickDate, onClickOutside }: PickerProps) => {
    const ref = useRef<null | HTMLDivElement>(null);

    const [selectedDate, setSelectedDate] = useState(value);
    const [displayDate, setDisplayDate] = useState<Date>(value);
    const [mode, setMode] = useState("calendar");

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
            className="absolute top-10 left-0 z-10 min-w-[320px] bg-gray-100"
        >
            <div className="p-4 bg-primary text-gray-100">
                <div className="text-gray-100/60">
                    <Button
                        className="borderless"
                        onClick={() => setMode("year")}
                    >
                        {selectedDate ? format(selectedDate, "yyyy") : ""}
                    </Button>
                </div>
                <div className="">
                    <Button
                        className="borderless text-2xl"
                        onClick={showSelectedDate}
                    >
                        {selectedDate
                            ? format(selectedDate, "eee, dd. MMM", options)
                            : ""}
                    </Button>
                </div>
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
                        updateDate={setSelectedDate}
                        displayDate={displayDate}
                    />
                )}
                {/* <FormElementDateInputMonthList
        v-if="mode == 'month'"
        :selectedDate="selectedDate"
        :changeMode="changeMode"
      />
      <FormElementDateInputYearList
        v-if="mode == 'year'"
        :changeMode="changeMode"
        :selectedDate="selectedDate"
        :onlyFuture="true"
        :intervalSize="10"
      /> */}
            </div>
        </div>
    );
};
