// Combines a Form Input field with a DatePicker.
// Input field value should be in format 'dd.mm.yyyy'
// date Picker expects an instance of Date() and returns an instance of Date()
// date-fns is used to format, parse and validate Dates
// German locale is used when displaying dates

import { FormEvent, useEffect, useState } from "react";
import { isValid, parse, format, isMatch } from "date-fns";
import { de } from "date-fns/locale/de";

import { Calendar } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { InputTP24 } from "@/Components/ui/input-tp24";

import { Picker } from "./picker";
import { cn } from "@/lib/utils";

export type DatePickerReturn = {
    id: string;
    value: Date;
};

interface DatePickerProps {
    value: Date;
    label: string;
    id: string;
    fieldName: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    onUpdateValue?: (result: DatePickerReturn) => void;
    removeError?: () => void;
}

type DatePickerReturnType = {
    event?: FormEvent<HTMLInputElement>;
    date?: Date;
};

const options = { locale: de };

export const DatePicker = ({
    value,
    label,
    id,
    fieldName,
    required,
    className,
    disabled,
    error,
    onUpdateValue,
    removeError,
}: DatePickerProps) => {
    const formatString = "dd.MM.yyyy";
    const [picker, setPicker] = useState(false);
    const [stringValue, setStringValue] = useState(
        value ? format(value, formatString, options) : ""
    );
    const [currentDate, setCurrentDate] = useState(new Date());

    const togglePicker = () => {
        removeError && removeError();
        setPicker(!picker);
    };

    const updateValue = ({ date, event }: DatePickerReturnType) => {
        // if the function was called by editing the input field
        if (
            event &&
            event.target instanceof HTMLInputElement &&
            event.target.type == "text"
        ) {
            setStringValue(event.target.value);
            return;
        }
        //if the function was called by selecting a date in the date Picker
        if (date) {
            const selectedDate = format(date, formatString, options);
            setStringValue(selectedDate);
            onUpdateValue && onUpdateValue({ id, value: date });
            setPicker(false);
            return;
        }
    };

    useEffect(() => {
        setStringValue(format(value, formatString, options));
    }, [value]);

    useEffect(() => {
        const date = parse(stringValue, formatString, new Date());
        if (
            isMatch(stringValue, formatString) &&
            stringValue.length === formatString.length &&
            isValid(date)
        ) {
            setCurrentDate(date);
            onUpdateValue && onUpdateValue({ id, value: date });
        }
    }, [stringValue]);

    return (
        <div className={cn("relative flex gap-2", className)}>
            <Button
                onClick={togglePicker}
                variant="ghost"
                size="sm"
                type="button"
            >
                <Calendar className="h-5 w-5" />
                <span className="sr-only">open Calendar to Pick a Date</span>
            </Button>
            <InputTP24
                className="w-full"
                id={id}
                type="text"
                value={stringValue}
                label={label}
                error={error}
                required={required}
                disabled={disabled}
                onFocus={removeError}
                onInput={(e) => updateValue({ event: e })}
            />
            {picker ? (
                <Picker
                    value={currentDate}
                    onPickDate={(date) => updateValue({ date })}
                    onClickOutside={() => setPicker(false)}
                />
            ) : null}
        </div>
    );
};
