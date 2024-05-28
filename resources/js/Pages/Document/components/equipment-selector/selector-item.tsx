import { CheckboxTP24 } from "@/Components/checkbox-tp24";
import { EquipmentItem } from "@/types/equipment";
import { useEffect, useState } from "react";

interface SelectorItemProps {
    item: EquipmentItem;
    selected?: boolean;
    changeSelected: (data: { id: number | string; checked: boolean }) => void;
}
export const SelectorItem = ({
    item,
    selected,
    changeSelected,
}: SelectorItemProps) => {
    const [checked, setChecked] = useState(selected);

    const handleSelectChange = (data: {
        id: number | string;
        checked: boolean;
    }) => {
        setChecked(data.checked);
        changeSelected({ id: data.id, checked: data.checked });
    };

    useEffect(() => {
        setChecked(selected);
    }, [selected]);

    return (
        <div className="w-full h-8 bg-neutral-100 p-2 flex items-center my-2 border-2 border-gray-200 rounded-md">
            <CheckboxTP24
                id={item.name}
                itemId={item.id}
                className="w-full lg:justify-start"
                label={item.name}
                checked={checked}
                labelSide="right"
                onCheckedChange={handleSelectChange}
            />
        </div>
    );
};
