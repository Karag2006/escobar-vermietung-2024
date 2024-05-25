// Combines a Form Input field with a TimePicker.
// Input field value should be in format 'HH:mm'
// time Picker expects an instance of Date() and returns an instance of Date()
// date-fns is used to format, parse and validate Times
// German locale is used when displaying Times

import { FormEvent, useEffect, useState } from "react";
import { isValid, parse, format } from "date-fns";
import { de } from "date-fns/locale/de";

import { Clock } from "lucide-react";

import { PickerReturn } from "@/types";

import { Button } from "@/Components/ui/button";
import { InputTP24 } from "@/Components/ui/input-tp24";
import { Picker } from "./picker";

interface TimePickerProps {
    value: string;
    label: string;
    id: string;
    fieldName: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    onUpdateValue?: (result: PickerReturn) => void;
    removeError?: () => void;
}

type TimePickerReturnType = {
    event?: FormEvent<HTMLInputElement>;
    time?: Date;
};

const options = { locale: de };
const TimeFormat = "HH:mm";

export const TimePicker = ({
    value,
    label,
    id,
    fieldName,
    error,
    required,
    disabled,
    onUpdateValue,
    removeError,
}: TimePickerProps) => {
    const [picker, setPicker] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const [currentTime, setCurrentTime] = useState(new Date());

    const togglePicker = () => {
        removeError && removeError();
        setPicker(!picker);
    };

    const updateValue = ({ time, event }: TimePickerReturnType) => {
        // if the function was called by editing the input field
        if (
            event &&
            event.target instanceof HTMLInputElement &&
            event.target.type == "text"
        ) {
            setSelectedValue(event.target.value);
            onUpdateValue && onUpdateValue({ id, value: event.target.value });
            setPicker(false);
            return;
        }
        //if the function was called by selecting a time in the time Picker
        if (time) {
            const selectedTime = format(time, TimeFormat, options);
            setSelectedValue(selectedTime);
            onUpdateValue && onUpdateValue({ id, value: selectedTime });
            setPicker(false);
            return;
        }
    };

    useEffect(() => {
        const setDate = (date?: string) => {
            if (date && isValid(parse(date, TimeFormat, new Date())))
                return parse(date, TimeFormat, new Date());

            return new Date();
        };

        setCurrentTime(setDate(selectedValue));
        return () => {};
    }, [selectedValue]);

    return (
        <div className="relative flex gap-2">
            <Button
                onClick={togglePicker}
                variant="ghost"
                size="sm"
                type="button"
            >
                <Clock className="h-5 w-5" />
                <span className="sr-only">
                    open Time Picker to select a Time
                </span>
            </Button>
            <InputTP24
                className="w-full"
                id={id}
                type="text"
                value={value}
                label={label}
                error={error}
                required={required}
                disabled={disabled}
                onFocus={removeError}
                onInput={(e) => updateValue({ event: e })}
            />
            {picker ? (
                <Picker
                    value={currentTime}
                    onPickTime={(time: Date) => updateValue({ time })}
                    onClickOutside={() => setPicker(false)}
                />
            ) : null}
        </div>
    );
};
