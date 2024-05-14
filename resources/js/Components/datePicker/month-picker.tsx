// Combines a Form Input field with a DatePicker. Limited to months
// Input field value should be in format 'MM/yy'
// date Picker expects an instance of Date() and returns an instance of Date()
// date-fns is used to format, parse and validate Dates
// German locale is used when displaying dates

import { FormEvent, useEffect, useState } from "react";
import { isValid, parse, format } from "date-fns";
import { de } from "date-fns/locale/de";

import { Calendar } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { InputTP24 } from "@/Components/ui/input-tp24";

import { Picker } from "./picker";
import { PickerReturn } from "@/types";

interface DatePickerProps {
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

type DatePickerReturnType = {
    event?: FormEvent<HTMLInputElement>;
    date?: Date;
};

const options = { locale: de };

const expectedFormat = "MM/yy";

export const MonthPicker = ({
    value,
    label,
    id,
    fieldName,
    required,
    disabled,
    error,
    onUpdateValue,
    removeError,
}: DatePickerProps) => {
    const [picker, setPicker] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
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
            setSelectedValue(event.target.value);
            onUpdateValue && onUpdateValue({ id, value: event.target.value });
            setPicker(false);
            return;
        }
        //if the function was called by selecting a date in the date Picker
        if (date) {
            const selectedDate = format(date, expectedFormat, options);
            setSelectedValue(selectedDate);
            onUpdateValue && onUpdateValue({ id, value: selectedDate });
            setPicker(false);
            return;
        }
    };
    useEffect(() => {
        const setDate = (date?: string) => {
            if (date && isValid(parse(date, expectedFormat, new Date())))
                return parse(date, expectedFormat, new Date());

            return new Date();
        };

        setCurrentDate(setDate(selectedValue));
        return () => {};
    }, [selectedValue]);
    return (
        <div className="relative flex gap-4">
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
                value={value}
                error={error}
                label={label}
                required={required}
                disabled={disabled}
                onFocus={removeError}
                onInput={(e) => updateValue({ event: e })}
            />
            {picker ? (
                <Picker
                    value={currentDate}
                    pickerStyle="month"
                    onPickDate={(date) => updateValue({ date })}
                    onClickOutside={() => setPicker(false)}
                />
            ) : null}
        </div>
    );
};
