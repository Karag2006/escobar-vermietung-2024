// expects instance of Date() in "value" prop, emits instance of Date()
// uses date-fns for all internal date related functionality
// uses German locale for displaying dates.

import { useEffect, useRef, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { de } from "date-fns/locale/de";

import { Button } from "@/Components/ui/button";
import { Hour } from "./hour";
import { Minute } from "./minute";

interface PickerProps {
    value: Date;
    pickerStyle?: string;
    onPickTime: (time: Date) => void;
    onClickOutside: () => void;
}

const options = { locale: de };
const TimeFormat = "HH:mm";

export const Picker = ({
    value,
    pickerStyle,
    onPickTime,
    onClickOutside,
}: PickerProps) => {
    const ref = useRef<null | HTMLDivElement>(null);

    const [selectedTime, setSelectedTime] = useState(value);
    const [displayTime, setDisplayTime] = useState({
        hour: "",
        minute: "",
    });
    const [mode, setMode] = useState("hour");

    const handleTimeSelect = (time: Date) => {
        setSelectedTime(time);
        onPickTime(time);
    };

    const handleHourClick = (hour: string) => {
        setDisplayTime({ ...displayTime, hour });
        if (displayTime.minute === "")
            setSelectedTime(parse(`${hour}:00`, TimeFormat, new Date()));
        else
            setSelectedTime(
                parse(`${hour}:${displayTime.minute}`, TimeFormat, new Date())
            );
        setMode("minute");
    };

    const handleMinuteClick = (minute: string) => {
        setDisplayTime({ ...displayTime, minute });
        if (displayTime.hour) {
            handleTimeSelect(
                parse(`${displayTime.hour}:${minute}`, TimeFormat, new Date())
            );
        } else setMode("hour");
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

    useEffect(() => {
        if (isValid(value)) {
            setDisplayTime({
                hour: format(value, "HH", options),
                minute: format(value, "mm", options),
            });
        }
    }, []);

    return (
        <div
            ref={ref}
            className="absolute top-10 left-0 z-10 min-w-[320px] bg-gray-100 shadow-md"
        >
            <div className="time-picker-head p-4 bg-primary text-gray-100">
                <div className="text-gray-100/60">
                    <Button
                        size="icon"
                        variant="borderless"
                        className="text-lg"
                        onClick={() => setMode("hour")}
                    >
                        {displayTime.hour ? displayTime.hour : "--"}
                    </Button>
                    <span>:</span>
                    <Button
                        variant="borderless"
                        className="text-lg"
                        onClick={() => setMode("minute")}
                    >
                        {displayTime.minute ? displayTime.minute : "--"}
                    </Button>
                </div>
            </div>
            <div className="card--body">
                {mode === "hour" && (
                    <Hour
                        displayTime={displayTime}
                        handleClick={handleHourClick}
                    />
                )}
                {mode === "minute" && (
                    <Minute
                        displayTime={displayTime}
                        handleClick={handleMinuteClick}
                    />
                )}
            </div>
        </div>
    );
};
