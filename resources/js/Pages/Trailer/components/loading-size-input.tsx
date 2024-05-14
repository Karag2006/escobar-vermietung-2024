import { InputTP24 } from "@/Components/ui/input-tp24";
import { useEffect, useState } from "react";

interface LoadingSizeInputProps {
    value: string[];
    error?: string;
    processing?: boolean;
    handleChangeSize: (size: {
        length: string;
        width: string;
        height: string;
    }) => void;
}

export const LoadingSizeInput = ({
    value,
    error,
    processing,
    handleChangeSize,
}: LoadingSizeInputProps) => {
    const [localValue, setLocalValue] = useState({
        length: "",
        width: "",
        height: "",
    });

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
    }, [value]);

    return (
        <div>
            <p className="mb-4">Lademaße ( L x B x H )</p>
            <div className="flex gap-4">
                <InputTP24
                    label="Länge *"
                    id="length"
                    value={localValue.length}
                    onInput={handleChange}
                    disabled={processing}
                />
                <InputTP24
                    label="Breite *"
                    id="width"
                    value={localValue.width}
                    onInput={handleChange}
                    disabled={processing}
                />
                <InputTP24
                    label="Höhe"
                    id="height"
                    value={localValue.height}
                    onInput={handleChange}
                    disabled={processing}
                />
            </div>
        </div>
    );
};
