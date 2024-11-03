import { Button } from "@/Components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { CircleArrowUp, Pencil, Printer, Trash2 } from "lucide-react";

interface SimpleReservationTableActionsProps {
    id: number;
    actions: {
        edit: (id: number) => void;
        delete: (id: number) => void;
        forward: (id: number) => void;
        print: (id: number) => void;
    };
}

export const SimpleReservationTableActions = ({
    id,
    actions,
}: SimpleReservationTableActionsProps) => {
    return (
        <div className="flex justify-end gap-4">
            <div className=" text-blue-600">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="icon"
                            size="content"
                            onClick={() => actions.print(id)}
                        >
                            <Printer className="h-5 w-5" />

                            <span className="sr-only">
                                Reservierung als PDF Drucken
                            </span>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                        Reservierung als PDF Drucken
                    </TooltipContent>
                </Tooltip>
            </div>

            <div className=" text-blue-700">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="icon"
                            size="content"
                            onClick={() => actions.forward(id)}
                        >
                            <CircleArrowUp className="h-5 w-5" />

                            <span className="sr-only">
                                in Mietvertrag umwandeln
                            </span>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>in Mietvertrag umwandeln</TooltipContent>
                </Tooltip>
            </div>

            <div className=" text-green-600">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="icon"
                            size="content"
                            onClick={() => actions.edit(id)}
                        >
                            <Pencil className="h-5 w-5" />

                            <span className="sr-only">
                                Reservierung bearbeiten
                            </span>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>Reservierung bearbeiten</TooltipContent>
                </Tooltip>
            </div>
            <div className="text-red-600">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="icon"
                            size="content"
                            onClick={() => actions.delete(id)}
                        >
                            <Trash2 className="h-5 w-5" />

                            <span className="sr-only">
                                Redervierung löschen
                            </span>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>Redervierung löschen</TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
};
