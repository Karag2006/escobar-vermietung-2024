import { InputTP24 } from "@/Components/ui/input-tp24";
import { useEffect, useState } from "react";

interface LoadingSizeInputProps {
    value: string[];
    errors?: {
        "loading_size.0": string;
        "loading_size.1": string;
        "loading_size.2": string;
    };
    processing?: boolean;
    clearErrors: (key: string) => void;
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
    const [localErrors, setLocalErrors] = useState({
        length: "",
        width: "",
        height: "",
    });

    const clearE = (key: string) => {
        clearErrors(key);
        if (key === "loading_size.0")
            setLocalErrors({ ...localErrors, length: "" });
        if (key === "loading_size.1")
            setLocalErrors({ ...localErrors, width: "" });
        if (key === "loading_size.2")
            setLocalErrors({ ...localErrors, height: "" });
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
                length: value[0] ? value[0] : "",
                width: value[1] ? value[1] : "",
                height: value[2] ? value[2] : "",
            });
        }
        if (
            errors &&
            (errors["loading_size.0"] ||
                errors["loading_size.1"] ||
                errors["loading_size.2"])
        ) {
            setLocalErrors({
                length: errors["loading_size.0"],
                width: errors["loading_size.1"],
                height: errors["loading_size.2"],
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
                    error={localErrors.length}
                    onInput={handleChange}
                    onFocus={() => clearE("loading_size.0")}
                    disabled={processing}
                />
                <InputTP24
                    label="Breite *"
                    id="width"
                    value={localValue.width}
                    error={localErrors.width}
                    onInput={handleChange}
                    onFocus={() => clearE("loading_size.1")}
                    disabled={processing}
                />
                <InputTP24
                    label="Höhe"
                    id="height"
                    value={localValue.height}
                    error={localErrors.height}
                    onInput={handleChange}
                    onFocus={() => clearE("loading_size.2")}
                    disabled={processing}
                />
            </div>
        </div>
    );
};
