import { Button } from "./ui/button";

interface DecisionButtonsProps {
    yesLabel: string;
    noLabel: string;
    sendForm?: boolean;
    id?: number;
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
}: DecisionButtonsProps) => {
    return (
        <div className="flex gap-4">
            {sendForm && (
                <Button variant="success" type="submit">
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
            <Button variant="destructive" type="button" onClick={noAction}>
                {noLabel}
            </Button>
        </div>
    );
};
