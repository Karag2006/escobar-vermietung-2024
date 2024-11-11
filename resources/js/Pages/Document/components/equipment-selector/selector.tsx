import { InputTP24 } from "@/Components/ui/input-tp24";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { EquipmentItem } from "@/types/equipment";
import { SelectorItem } from "./selector-item";
import { useEffect, useState } from "react";
import { InputClearButton } from "@/Components/input-clear-button";

interface SelectorProps {
    equipmentList: EquipmentItem[];
    selectedItems: EquipmentItem[];
    addItem: (item: EquipmentItem) => void;
    removeItem: (item: EquipmentItem) => void;
}

export const Selector = ({
    equipmentList,
    selectedItems,
    addItem,
    removeItem,
}: SelectorProps) => {
    const [filter, setFilter] = useState("");
    const [filteredList, setFilteredList] = useState(equipmentList);

    const updateFilter = (e: React.FormEvent<HTMLInputElement>) => {
        const { id, value } = e.currentTarget;
        if (id !== "filter") return;

        setFilter(value);
        setFilteredList(
            equipmentList.filter((element) => {
                const name = element.name.toLowerCase();
                const details = element.details
                    ? element.details.toLowerCase()
                    : "";

                return (
                    name.includes(value.toLowerCase()) ||
                    details.includes(value.toLowerCase())
                );
            })
        );
    };

    const handleChangeSelected = (data: {
        id: string | number;
        checked: boolean;
    }) => {
        const item = equipmentList?.find((element) => element.id === data.id);
        if (item && data.checked) addItem(item);
        else if (item && !data.checked) removeItem(item);
    };

    const clearFilter = () => {
        setFilter("");
        setFilteredList(equipmentList);
    };

    useEffect(() => {
        setFilteredList(equipmentList);
    }, [equipmentList]);

    useEffect(() => {}, [selectedItems]);

    return (
        <div>
            <InputTP24
                id="filter"
                label="Filter"
                value={filter}
                onChange={updateFilter}
                suffix={
                    filter &&
                    filter !== "" && (
                        <InputClearButton clearValue={clearFilter} />
                    )
                }
            />
            <ScrollArea className="h-32">
                {filteredList.map((item) => (
                    <div key={item.id} className="">
                        <SelectorItem
                            item={item}
                            selected={selectedItems?.some(
                                (element) => element.id === item.id
                            )}
                            changeSelected={handleChangeSelected}
                        />
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
};
