import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ActionButtonProps {
    label: string;
    actionType: "add" | "default";
    action: () => void;
}

export const ActionButton = ({
    label,
    actionType,
    action,
}: ActionButtonProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={actionType === "add" ? "success" : "default"}
                    onClick={action}
                    className="font-semibold"
                >
                    {actionType === "add" && <Plus className="h-6 w-6 mr-2" />}
                    <span>{label}</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    );
};
