import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface EditActionProps {
    id: number;
    edit: (id: number) => void;
    tooltip?: string;
}

export const EditAction = ({ id, edit, tooltip }: EditActionProps) => {
    return (
        <div className=" text-green-600">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="icon"
                        size="content"
                        onClick={() => edit(id)}
                    >
                        <Pencil className="h-5 w-5" />

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
