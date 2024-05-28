import { EquipmentItem } from "@/types/equipment";
import { SelectedList } from "./selected-list";
import { Selector } from "./selector";
import { useEffect, useState } from "react";
import { getEquipmentList } from "@/data/equipment";

export const EquipmentSelector = ({}) => {
    const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
    const [selectedEquipmentList, setSelectedEquipmentList] = useState<
        EquipmentItem[]
    >([]);

    const addToSelectedEquipmentList = (item: EquipmentItem) => {
        let temp = [item];
        setSelectedEquipmentList(selectedEquipmentList.concat(temp));
    };

    const removeFromSelectedEquipmentList = (item: EquipmentItem) => {
        let temp = selectedEquipmentList.filter((element) => {
            return element.id !== item.id;
        });

        setSelectedEquipmentList(temp);
    };

    useEffect(() => {
        getEquipmentList().then((data) => {
            setEquipmentList(data);
        });
    }, []);

    return (
        <div className="documentEquipmentBlock w-full">
            <h4>Zubehör Auswahl</h4>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="flex flex-col w-full">
                    <Selector
                        equipmentList={equipmentList}
                        selectedItems={selectedEquipmentList}
                        addItem={addToSelectedEquipmentList}
                        removeItem={removeFromSelectedEquipmentList}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <SelectedList selectedItems={selectedEquipmentList} />
                </div>
            </div>
        </div>
    );
};
