import { InputTP24 } from "@/Components/ui/input-tp24";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CurrencyInputProps {
    value: string;
    id: string;
    label: string;
    className?: string;
    disabled?: boolean;
    error?: string;
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
    onValueChange,
    onFinishedValueChange,
}: CurrencyInputProps) => {
    return (
        <InputTP24
            value={value}
            onChange={onValueChange}
            onBlur={onFinishedValueChange}
            className={cn("w-full max-h-[33px]", className)}
            label={label}
            id={id}
            disabled={disabled}
            error={error}
            prefixElement="€"
        />
    );
};
