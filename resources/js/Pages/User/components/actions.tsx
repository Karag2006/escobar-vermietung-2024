import { Button } from "@/Components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const Actions = () => {
    const handleEdit = () => {
        console.log("edit");
    };

    const handleDelete = () => {
        console.log("delete");
    };
    return (
        <div className="flex justify-end gap-4">
            <div className=" text-yellow-600">
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
};
