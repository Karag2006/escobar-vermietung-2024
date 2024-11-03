import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface DeleteActionProps {
    id: number;
    erase: (id: number) => void;
    tooltip?: string;
}

export const DeleteAction = ({ id, erase, tooltip }: DeleteActionProps) => {
    return (
        <div className=" text-red-600">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="icon"
                        size="content"
                        onClick={() => erase(id)}
                    >
                        <Trash2 className="h-5 w-5" />

                        <span className="sr-only">
                            {tooltip || "Bearbeiten"}
                        </span>
                    </Button>
                </TooltipTrigger>

                <TooltipContent>{tooltip || "Bearbeiten"}</TooltipContent>
            </Tooltip>
        </div>
    );
};
