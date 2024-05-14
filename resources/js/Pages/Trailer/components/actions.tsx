import { Button } from "@/Components/ui/button";
import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { trailerSchema } from "@/types/trailer";
import { cn } from "@/lib/utils";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

interface ActionsProps<TData> {
    row: Row<TData>;
    className?: string;
    editModal: (id: number) => void;
    deleteModal: (id: number) => void;
}

export function Actions<TData>({
    row,
    className,
    editModal,
    deleteModal,
}: ActionsProps<TData>) {
    const trailer = trailerSchema.parse(row.original);

    const handleEdit = () => {
        if (trailer.id) editModal(trailer.id);
    };

    const handleDelete = () => {
        if (trailer.id) deleteModal(trailer.id);
    };
    return (
        <div className={cn("flex justify-end gap-4", className)}>
            <div className=" text-green-600">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="icon"
                            size="content"
                            onClick={handleEdit}
                        >
                            <Pencil className="h-5 w-5" />
                            <span className="sr-only">Anhänger bearbeiten</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Anhänger bearbeiten</TooltipContent>
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
                            <span className="sr-only">Anhänger löschen</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Anhänger löschen</TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
