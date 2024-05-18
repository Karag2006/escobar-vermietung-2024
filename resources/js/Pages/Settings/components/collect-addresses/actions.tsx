import { Button } from "@/Components/ui/button";
import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { collectAddressSchema } from "@/types/collect-address";
import { cn } from "@/lib/utils";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

interface ActionsProps<TData> {
    row: Row<TData>;
    className?: string;
    editRow?: number;
    editStart?: (id: number) => void;
    deleteModal?: (id: number) => void;
}

export function Actions<TData>({
    row,
    className,
    editRow,
    editStart,
    deleteModal,
}: ActionsProps<TData>) {
    if (editRow && editRow >= 0) return null;

    const collectAddress = collectAddressSchema.parse(row.original);

    const handleEdit = () => {
        if (collectAddress.id && editStart) editStart(collectAddress.id);
    };

    const handleDelete = () => {
        if (collectAddress.id && deleteModal) deleteModal(collectAddress.id);
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
                            <span className="sr-only">
                                Abholadresse bearbeiten
                            </span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Abholadresse bearbeiten</TooltipContent>
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
                                Abholadresse löschen
                            </span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Abholadresse löschen</TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
