import { cn } from "@/lib/utils";

import { InputTP24 } from "@/Components/ui/input-tp24";

interface CurrencyInputProps {
    value: string;
    id: string;
    label: string;
    className?: string;
    disabled?: boolean;
    error?: string;
    // 13.11.2024 Error handling
    // Currency Inputs benötigen eine removError Funktion
    // sowie ein fieldname Attribut
    removeError?: (key: string) => void;
    fieldname?: string;

    onValueChange: (e: React.FormEvent<HTMLInputElement>) => void;
    onFinishedValueChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const CurrencyInput = ({
    value,
    id,
    label,
    className,
    disabled,
    error,
    fieldname,
    removeError,
    onValueChange,
    onFinishedValueChange,
}: CurrencyInputProps) => {
    return (
        <InputTP24
            value={value}
            onChange={onValueChange}
            onBlur={onFinishedValueChange}
            onFocus={() =>
                removeError && removeError(fieldname ? fieldname : id)
            }
            className={cn("w-full max-h-[33px]", className)}
            label={label}
            id={id}
            disabled={disabled}
            error={error}
            prefixElement="€"
        />
    );
};
