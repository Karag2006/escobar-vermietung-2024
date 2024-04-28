import { Button } from "@/Components/ui/button";
import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { userSchema } from "@/types/user";
import { useModalStore } from "@/stores/modalStore";

interface ActionsProps<TData> {
    row: Row<TData>;
    editModal: (id: number) => void;
}

export function Actions<TData>({ row, editModal }: ActionsProps<TData>) {
    const { switchOpen, open } = useModalStore((state) => state);
    const user = userSchema.parse(row.original);

    const handleEdit = () => {
        console.log({ edit: user.email });
        if (user.id) editModal(user.id);
    };

    const handleDelete = () => {
        console.log("delete");
    };
    return (
        <div className="flex justify-end gap-4">
            <div className=" text-green-600">
                <Button variant="icon" size="content" onClick={handleEdit}>
                    <Pencil className="h-5 w-5" />
                    <span className="sr-only">Benutzer bearbeiten</span>
                </Button>
            </div>
            <div className="text-red-600">
                <Button variant="icon" size="content" onClick={handleDelete}>
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Benutzer löschen</span>
                </Button>
            </div>
        </div>
    );
}
