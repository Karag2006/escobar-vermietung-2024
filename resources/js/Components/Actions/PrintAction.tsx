import { Printer } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface PrintActionProps {
    id: number;
    print: (id: number) => void;
    tooltip?: string;
}

export const PrintAction = ({ id, print, tooltip }: PrintActionProps) => {
    return (
        <div className=" text-blue-600">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="icon"
                        size="content"
                        onClick={() => print(id)}
                    >
                        <Printer className="h-5 w-5" />

                        <span className="sr-only">
                            {tooltip || "Reservierung als PDF Drucken"}
                        </span>
                    </Button>
                </TooltipTrigger>

                <TooltipContent>
                    {tooltip || "Reservierung als PDF Drucken"}
                </TooltipContent>
            </Tooltip>
        </div>
    );
};
