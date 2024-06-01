import { Button } from "@/Components/ui/button";
import { Row } from "@tanstack/react-table";
import { CircleArrowUp, FileText, Pencil, Printer, Trash2 } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { documentSchema } from "@/types/document";

interface ActionsProps<TData> {
    row: Row<TData>;
    editModal: (id: number) => void;
    deleteModal: (id: number) => void;
}

export function Actions<TData>({
    row,
    editModal,
    deleteModal,
}: ActionsProps<TData>) {
    const document = documentSchema.parse(row.original);

    const translateState = () => {
        if (document.current_state === "offer") return "Angebot";
        if (document.current_state === "reservation") return "Reservierung";
        if (document.current_state === "contract") return "Mietvertrag";
    };

    const documentState = translateState();

    const handleEdit = () => {
        if (document.id) editModal(document.id);
    };

    const handleDelete = () => {
        if (document.id) deleteModal(document.id);
    };

    const handlePrint = () => {
        return;
    };

    const handleForward = () => {
        return;
    };
    return (
        <div className="flex justify-end gap-4">
            <div className=" text-blue-600">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="icon"
                            size="content"
                            onClick={handlePrint}
                        >
                            <Printer className="h-5 w-5" />

                            <span className="sr-only">
                                {documentState} als PDF Drucken
                            </span>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                        {documentState} als PDF Drucken
                    </TooltipContent>
                </Tooltip>
            </div>
            {(document.current_state === "offer" ||
                document.current_state === "reservation") && (
                <div className=" text-blue-700">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="icon"
                                size="content"
                                onClick={handleForward}
                            >
                                <CircleArrowUp className="h-5 w-5" />

                                <span className="sr-only">
                                    {documentState} in Reservierung umwandeln
                                </span>
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent>
                            {documentState} in Reservierung umwandeln
                        </TooltipContent>
                    </Tooltip>
                </div>
            )}
            <div className=" text-green-600">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="icon"
                            size="content"
                            onClick={handleEdit}
                        >
                            <Pencil className="h-5 w-5" />

                            <span className="sr-only">
                                {documentState} bearbeiten
                            </span>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>{documentState} bearbeiten</TooltipContent>
                </Tooltip>
            </div>
            <div className="text-red-600">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="icon"
                            size="content"
                            onClick={handleDelete}
                        >
                            <Trash2 className="h-5 w-5" />

                            <span className="sr-only">
                                {documentState} löschen
                            </span>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>{documentState} löschen</TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
