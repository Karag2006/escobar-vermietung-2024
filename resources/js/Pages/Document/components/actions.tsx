import { Button } from "@/Components/ui/button";
import { Row } from "@tanstack/react-table";
import { CircleArrowUp, FileText, Pencil, Printer, Trash2 } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { documentSchema } from "@/types/document";
import { getDocumentTypeTranslation } from "@/lib/utils";
import { downloadPDF } from "@/data/document";
import { router } from "@inertiajs/react";

interface ActionsProps<TData> {
    row: Row<TData>;
    editModal: (id: number) => void;
    deleteModal: (id: number) => void;
    forwardModal?: (id: number) => void;
}

export function Actions<TData>({
    row,
    editModal,
    deleteModal,
    forwardModal,
}: ActionsProps<TData>) {
    const currentDocument = documentSchema.parse(row.original);

    const germanCurrentState = getDocumentTypeTranslation(
        currentDocument.current_state
    );

    const handleEdit = () => {
        if (currentDocument.id) editModal(currentDocument.id);
    };

    const handleDelete = () => {
        if (currentDocument.id) deleteModal(currentDocument.id);
    };

    const handlePrint = () => {
        if (currentDocument.id) {
            downloadPDF(currentDocument.id).then((data) => {
                const fileURL = data;
                let link = document.createElement("a");
                const linkParts: [] = fileURL.split("/");
                link.href = fileURL;
                link.target = "_blank";
                link.setAttribute(
                    "open",
                    `${currentDocument.current_state}_${
                        linkParts[linkParts.length - 1]
                    }`
                );
                document.body.appendChild(link);

                link.click();
            });
        }
    };

    const handleForward = () => {
        if (forwardModal && currentDocument.id) {
            forwardModal(currentDocument.id);
        }
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
                                {germanCurrentState} als PDF Drucken
                            </span>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                        {germanCurrentState} als PDF Drucken
                    </TooltipContent>
                </Tooltip>
            </div>
            {(currentDocument.current_state === "offer" ||
                currentDocument.current_state === "reservation") && (
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
                                    {germanCurrentState} in Reservierung
                                    umwandeln
                                </span>
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent>
                            {germanCurrentState} in Reservierung umwandeln
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
                                {germanCurrentState} bearbeiten
                            </span>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                        {germanCurrentState} bearbeiten
                    </TooltipContent>
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
                                {germanCurrentState} löschen
                            </span>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                        {germanCurrentState} löschen
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
