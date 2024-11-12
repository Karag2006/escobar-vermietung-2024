import { useEffect, useState } from "react";

import { LoadingSizeErrors } from "./form";

import { InputTP24 } from "@/Components/ui/input-tp24";
interface LoadingSizeInputProps {
    value: string[] | number[];
    errors?: LoadingSizeErrors;
    processing?: boolean;
    clearErrors?: (key: keyof LoadingSizeErrors) => void;
    handleChangeSize: (size: {
        length: string;
        width: string;
        height: string;
    }) => void;
}

export const LoadingSizeInput = ({
    value,
    errors,
    processing,
    clearErrors,
    handleChangeSize,
}: LoadingSizeInputProps) => {
    const [localValue, setLocalValue] = useState({
        length: "",
        width: "",
        height: "",
    });

    const clearE = (key: keyof LoadingSizeErrors) => {
        clearErrors && clearErrors(key);
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setLocalValue((localValue) => ({
            ...localValue,
            [key]: value,
        }));
        handleChangeSize({ ...localValue, [key]: value });
    };

    useEffect(() => {
        if (value) {
            setLocalValue({
                // casting numbers to string to have a constant type for the value
                length: value[0] ? value[0] + "" : "",
                width: value[1] ? value[1] + "" : "",
                height: value[2] ? value[2] + "" : "",
            });
        }
    }, [value, errors]);

    return (
        <div>
            <p className="mb-4">Lademaße ( L x B x H )</p>
            <div className="flex gap-4">
                <InputTP24
                    label="Länge *"
                    id="length"
                    value={localValue.length}
                    error={errors?.["loading_size.0"]}
                    onInput={handleChange}
                    onFocus={() => clearE("loading_size.0")}
                    disabled={processing}
                />
                <InputTP24
                    label="Breite *"
                    id="width"
                    value={localValue.width}
                    error={errors?.["loading_size.1"]}
                    onInput={handleChange}
                    onFocus={() => clearE("loading_size.1")}
                    disabled={processing}
                />
                <InputTP24
                    label="Höhe"
                    id="height"
                    value={localValue.height}
                    error={errors?.["loading_size.2"]}
                    onInput={handleChange}
                    onFocus={() => clearE("loading_size.2")}
                    disabled={processing}
                />
            </div>
        </div>
    );
};
