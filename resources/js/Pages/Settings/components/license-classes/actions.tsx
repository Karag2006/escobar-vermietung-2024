import { Plus, Save, Trash2, X } from "lucide-react";

import { Button } from "@/Components/ui/button";

interface ActionsProps {
    edit: boolean;
    addItem: () => void;
    editItem: () => void;
    deleteItem: () => void;
    cancel: () => void;
}

export const Actions = ({
    edit,
    addItem,
    editItem,
    deleteItem,
    cancel,
}: ActionsProps) => {
    return (
        <div className="flex">
            {!edit ? (
                <Button
                    variant="icon"
                    size="icon"
                    className="text-green-600"
                    onClick={addItem}
                >
                    <Plus className="h-5 w-5" />
                </Button>
            ) : (
                <>
                    <Button
                        variant="icon"
                        size="icon"
                        className="text-green-600"
                        onClick={editItem}
                    >
                        <Save className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="icon"
                        size="icon"
                        className="text-destructive"
                        onClick={deleteItem}
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </>
            )}
            <Button
                variant="icon"
                size="icon"
                className="text-destructive"
                onClick={cancel}
            >
                <X className="h-5 w-5" />
            </Button>
        </div>
    );
};
