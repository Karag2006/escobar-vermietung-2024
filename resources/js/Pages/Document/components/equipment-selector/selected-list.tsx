import { EquipmentItem } from "@/types/equipment";
import { useEffect, useState } from "react";
import { SelectedItem } from "./selected-item";

interface SelectedListProps {
    selectedItems: EquipmentItem[];
    removeItem: (item: EquipmentItem) => void;
    updateItem: (item: EquipmentItem) => void;
}

export const SelectedList = ({
    selectedItems,
    removeItem,
    updateItem,
}: SelectedListProps) => {
    const [selected, setSelected] = useState(selectedItems);

    useEffect(() => {
        setSelected(selectedItems);
    }, [selectedItems]);

    return (
        <div className="flex flex-col gap-2">
            {selected?.map((item) => (
                <div key={item.id}>
                    <SelectedItem
                        item={item}
                        removeItem={removeItem}
                        updateItem={updateItem}
                    />
                </div>
            ))}
        </div>
    );
};
