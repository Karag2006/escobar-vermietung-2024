import { Button } from "@/Components/ui/button";
import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { customerSchema } from "@/types/customer";
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
    const customer = customerSchema.parse(row.original);

    const handleEdit = () => {
        if (customer.id) editModal(customer.id);
    };

    const handleDelete = () => {
        console.log("delete");
        if (customer.id) deleteModal(customer.id);
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
                            <span className="sr-only">Kunden bearbeiten</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Kunden bearbeiten</TooltipContent>
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
                            <span className="sr-only">Kunden löschen</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Kunden löschen</TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
