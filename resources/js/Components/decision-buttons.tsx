import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

interface DecisionButtonsProps {
    yesLabel: string;
    noLabel: string;
    className?: string;
    sendForm?: boolean;
    id?: number;
    disabled?: boolean;
    yesAction?: (id?: number) => void;
    noAction: () => void;
}

export const DecisionButtons = ({
    yesLabel,
    yesAction,
    noLabel,
    noAction,
    sendForm,
    id,
    className,
    disabled,
}: DecisionButtonsProps) => {
    return (
        <div className={cn("flex gap-4 mt-8", className)}>
            {sendForm && (
                <Button variant="success" type="submit" disabled={disabled}>
                    {yesLabel}
                </Button>
            )}
            {!sendForm && yesAction && (
                <Button
                    variant="success"
                    type="button"
                    onClick={() => yesAction(id)}
                >
                    {yesLabel}
                </Button>
            )}
            <Button
                variant="destructive"
                type="button"
                onClick={noAction}
                disabled={disabled}
            >
                {noLabel}
            </Button>
        </div>
    );
};
