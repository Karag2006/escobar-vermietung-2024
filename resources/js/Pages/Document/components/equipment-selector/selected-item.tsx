import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { EquipmentItem } from "@/types/equipment";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface SelectedItemProps {
    item: EquipmentItem;
    removeItem: (item: EquipmentItem) => void;
    updateItem: (item: EquipmentItem) => void;
}

export const SelectedItem = ({
    item,
    removeItem,
    updateItem,
}: SelectedItemProps) => {
    const [localItem, setLocalItem] = useState(item);

    const setNumber = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setLocalItem({
            ...item,
            number: value ? parseInt(value) : undefined,
        });
        updateItem({ ...item, number: value ? parseInt(value) : undefined });
    };

    useEffect(() => {
        setLocalItem({
            ...item,
            number: item.number ? item.number : item.defaultNumber,
        });
    }, [item]);

    return (
        <Badge variant="outline" className="flex gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="icon"
                        size="icon"
                        onClick={() => removeItem(localItem)}
                    >
                        <X className="h-5 w-5 text-destructive hover:text-destructive/50" />
                        <span className="sr-only">
                            {localItem.name} entfernen
                        </span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <span>{localItem.name} entfernen</span>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <input
                        id={localItem.name + "Number"}
                        className="w-6 border-b-2 border-gray-400 focus:outline-none focus:border-blue-600 bg-transparent"
                        type="text"
                        value={localItem.number ? String(localItem.number) : ""}
                        onChange={setNumber}
                    />
                </TooltipTrigger>
                <TooltipContent>
                    <span>Anzahl für {localItem.name} einstellen</span>
                </TooltipContent>
            </Tooltip>
            <span> x {localItem.name}</span>
        </Badge>
    );
};
