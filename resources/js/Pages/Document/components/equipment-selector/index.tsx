import { EquipmentItem } from "@/types/equipment";
import { SelectedList } from "./selected-list";
import { Selector } from "./selector";
import { useEffect, useState } from "react";
import { getEquipmentList } from "@/data/equipment";

interface EquipmentSelectorProps {
    onListChange: (list: EquipmentItem[]) => void;
    selectedList: EquipmentItem[];
}

export const EquipmentSelector = ({
    onListChange,
    selectedList,
}: EquipmentSelectorProps) => {
    const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
    const [selectedEquipmentList, setSelectedEquipmentList] = useState<
        EquipmentItem[]
    >([]);

    const addToSelectedEquipmentList = (item: EquipmentItem) => {
        let temp = [item];
        setSelectedEquipmentList(selectedEquipmentList.concat(temp));
        onListChange(selectedEquipmentList.concat(temp));
    };

    const removeFromSelectedEquipmentList = (item: EquipmentItem) => {
        let temp = selectedEquipmentList.filter((element) => {
            return element.id !== item.id;
        });

        setSelectedEquipmentList(temp);
        onListChange(temp);
    };

    const updateItemInSelectedEquipmentList = (item: EquipmentItem) => {
        let temp = selectedEquipmentList;
        const index = temp.findIndex((element) => element.id === item.id);

        if (index > -1) {
            temp[index] = item;
        }
        console.log(temp);
        setSelectedEquipmentList(temp);
        onListChange(temp);
    };

    useEffect(() => {
        getEquipmentList().then((data) => {
            setEquipmentList(data);
        });
    }, []);

    useEffect(() => {
        setSelectedEquipmentList(selectedList);
    }, [selectedList]);

    return (
        <div className="documentEquipmentBlock w-full">
            <h4>Zubehör Auswahl</h4>
            <div className="flex flex-col md:flex-row gap-10 mt-6">
                <div className="flex flex-col w-full">
                    <Selector
                        equipmentList={equipmentList}
                        selectedItems={selectedEquipmentList}
                        addItem={addToSelectedEquipmentList}
                        removeItem={removeFromSelectedEquipmentList}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <SelectedList
                        selectedItems={selectedEquipmentList}
                        removeItem={removeFromSelectedEquipmentList}
                        updateItem={updateItemInSelectedEquipmentList}
                    />
                </div>
            </div>
        </div>
    );
};
