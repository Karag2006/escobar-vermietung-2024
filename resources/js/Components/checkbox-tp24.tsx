import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

interface CheckboxTP24Props {
    label: string;
    id: string;
    itemId?: number;
    checked?: boolean;
    className?: string;
    labelSide?: "left" | "right";
    error?: string;
    onCheckedChange: (data: { id: string | number; checked: boolean }) => void;
}

export const CheckboxTP24 = ({
    id,
    label,
    itemId,
    checked,
    error,
    className,
    labelSide,
    onCheckedChange,
}: CheckboxTP24Props) => {
    const handleCheckChange = (checked: boolean) => {
        if (itemId) onCheckedChange({ id: itemId, checked });

        onCheckedChange({ id, checked });
    };
    return (
        <div className={cn("flex gap-2 justify-start items-center", className)}>
            {(!labelSide || labelSide === "left") && (
                <label htmlFor={id} className=" text-muted-foreground mr-2">
                    {label}
                </label>
            )}
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={handleCheckChange}
            />
            {labelSide === "right" && (
                <label htmlFor={id} className=" text-muted-foreground ml-2">
                    {label}
                </label>
            )}
        </div>
    );
};
