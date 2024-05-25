import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

interface CheckboxTP24Props {
    label: string;
    id: string;
    checked: boolean;
    className?: string;
    error?: string;
    onCheckedChange: (data: { id: string; checked: boolean }) => void;
}

export const CheckboxTP24 = ({
    id,
    label,
    checked,
    error,
    className,
    onCheckedChange,
}: CheckboxTP24Props) => {
    const handleCheckChange = (checked: boolean) => {
        onCheckedChange({ id, checked });
    };
    return (
        <div className={cn("flex gap-2 justify-start items-center", className)}>
            <label htmlFor={id} className=" text-muted-foreground mr-2">
                {label}
            </label>
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={handleCheckChange}
            />
        </div>
    );
};
