import { CircleArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ForwardActionProps {
    id: number;
    forward: (id: number) => void;
    tooltip?: string;
}

export const ForwardAction = ({ id, forward, tooltip }: ForwardActionProps) => {
    return (
        <div className=" text-blue-600">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="icon"
                        size="content"
                        onClick={() => forward(id)}
                    >
                        <CircleArrowUp className="h-5 w-5" />

                        <span className="sr-only">
                            {tooltip || "Dokument auf die nächste Stufe setzen"}
                        </span>
                    </Button>
                </TooltipTrigger>

                <TooltipContent>
                    {tooltip || "Dokument auf die nächste Stufe setzen"}
                </TooltipContent>
            </Tooltip>
        </div>
    );
};
