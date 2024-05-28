import { X } from "lucide-react";

import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface InputClearButtonProps {
    clearValue: () => void;
}

export const InputClearButton = ({ clearValue }: InputClearButtonProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="icon" size="icon" onClick={clearValue}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Feld leeren</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent>Feld leeren</TooltipContent>
        </Tooltip>
    );
};
