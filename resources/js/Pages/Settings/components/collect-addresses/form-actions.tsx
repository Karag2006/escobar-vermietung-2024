import { Disc, Save, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/Components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

interface FormActionsProps {
    className?: string;
    cancelEdit?: () => void;
}

export function FormActions({ className, cancelEdit }: FormActionsProps) {
    return (
        <div className={cn("flex justify-end gap-4", className)}>
            <div className=" text-green-600">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="icon" size="content" type="submit">
                            <Save className="h-5 w-5" />
                            <span className="sr-only">
                                Abholadresse speichern
                            </span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Abholadresse speichern</TooltipContent>
                </Tooltip>
            </div>
            <div className="text-red-600">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="icon"
                            size="content"
                            onClick={cancelEdit}
                        >
                            <X className="h-5 w-5" />
                            <span className="sr-only">Abbrechen</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Abbrechen</TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
