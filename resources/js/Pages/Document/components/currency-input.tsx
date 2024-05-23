import { InputTP24 } from "@/Components/ui/input-tp24";

interface CurrencyInputProps {
    value: string;
    id: string;
    label: string;
    className?: string;
    disabled?: boolean;
    error?: string;
    onValueChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const CurrencyInput = ({
    value,
    id,
    label,
    className,
    disabled,
    error,
    onValueChange,
}: CurrencyInputProps) => {
    return (
        <InputTP24
            value={value}
            onChange={onValueChange}
            className={className}
            label={label}
            id={id}
            disabled={disabled}
            error={error}
            prefixElement="€"
        />
    );
};
