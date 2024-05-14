import { Button } from "@/Components/ui/button";
import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { userSchema } from "@/types/user";
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
    const user = userSchema.parse(row.original);

    const handleEdit = () => {
        console.log({ edit: user.email });
        if (user.id) editModal(user.id);
    };

    const handleDelete = () => {
        console.log("delete");
        if (user.id) deleteModal(user.id);
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
                            <span className="sr-only">Benutzer bearbeiten</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Benutzer bearbeiten</TooltipContent>
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
                            <span className="sr-only">Benutzer löschen</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Benutzer löschen</TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
