import { Button } from "@/Components/ui/button";
import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { equipmentSchema } from "@/types/equipment";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

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
    const equipment = equipmentSchema.parse(row.original);

    const handleEdit = () => {
        if (equipment.id) editModal(equipment.id);
    };

    const handleDelete = () => {
        console.log("delete");
        if (equipment.id) deleteModal(equipment.id);
    };
    return (
        <div className="flex justify-end gap-4">
            <div className=" text-green-600">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="icon"
                            size="content"
                            onClick={handleEdit}
                        >
                            <Pencil className="h-5 w-5" />
                            <span className="sr-only">Zubehör bearbeiten</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zubehör bearbeiten</TooltipContent>
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
                            <span className="sr-only">Zubehör löschen</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zubehör löschen</TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
