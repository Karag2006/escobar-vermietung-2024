import { EquipmentItem } from "@/types/equipment";
import { useEffect, useState } from "react";

interface SelectedListProps {
    selectedItems: EquipmentItem[];
}

export const SelectedList = ({ selectedItems }: SelectedListProps) => {
    const [selected, setSelected] = useState(selectedItems);

    useEffect(() => {
        console.log(selectedItems);
        setSelected(selectedItems);
    }, [selectedItems]);

    return (
        <div>
            Selected List:
            {selected.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
};
