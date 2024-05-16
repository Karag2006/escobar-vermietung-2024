import { Button } from "@/Components/ui/button";

interface DecisionButtonsProps {
    yesLabel: string;
    noLabel: string;
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
    disabled,
}: DecisionButtonsProps) => {
    return (
        <div className="flex gap-4 mt-8">
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
