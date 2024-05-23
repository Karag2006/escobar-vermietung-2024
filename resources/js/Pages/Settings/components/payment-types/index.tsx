import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import { PickerReturn } from "@/types";

import { DecisionButtons } from "@/Components/decision-buttons";
import { Combobox } from "@/Components/combobox";
import { InputTP24 } from "@/Components/ui/input-tp24";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";

import { Actions } from "./actions";

interface PaymentTypesProps {
    types: string[];
}

export const PaymentTypes = ({ types }: PaymentTypesProps) => {
    const { data, setData, patch } = useForm({
        payment_types: types,
    });

    const [editedIndex, setEditedIndex] = useState(-1);
    const [editedType, setEditedType] = useState("");
    const [editedTypeValue, setEditedTypeValue] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);

    const handleComboChange = (data: PickerReturn) => {
        setEditedType(data.value + "");
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setEditedTypeValue(e.currentTarget.value);
    };

    const editType = () => {
        const index = data.payment_types.findIndex((item) => {
            return item === editedType;
        });
        if (index > -1) {
            setEditedIndex(index);
        } else {
            setEditedIndex(index);
            setData((data) => ({ ...data, payment_types: types }));
        }
        setEditedTypeValue(editedType);
    };

    const cancel = () => {
        setEditedIndex(-1);
        setEditedType("");
        setEditedTypeValue("");
        setDeleteModal(false);
        setData((data) => ({ ...data, payment_types: types }));
    };

    const addTypeToList = () => {
        let array = data.payment_types;
        array.push(editedTypeValue);
        setData((data) => ({ ...data, payment_types: array }));
        saveTypes();
    };

    const changeType = () => {
        let array = data.payment_types;
        array[editedIndex] = editedTypeValue;
        setData((data) => ({ ...data, payment_types: array }));
        saveTypes();
    };

    const deleteType = () => {
        setDeleteModal(true);
    };

    const deleteTypeConfirm = () => {
        let array = data.payment_types;
        array.splice(editedIndex, 1);
        setData((data) => ({ ...data, payment_types: array }));
        saveTypes();
        setDeleteModal(false);
    };

    const saveTypes = () => {
        patch("/settings/paymenttypes/1", {
            only: ["settings", "errors"],
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Zahlungsart erfolgreich geändert");
                cancel();
            },
            onError: () => {
                toast.error("Fehler beim ändern der Zahlungsart");
            },
        });
    };

    useEffect(() => {
        editType();
    }, [editedType]);

    return (
        <>
            <div className="flex gap-8">
                <Combobox
                    className="w-[20rem]"
                    items={data.payment_types}
                    label="Auswahl Zahlungsart"
                    id="licenseClass"
                    value={editedType}
                    onValueChange={handleComboChange}
                />
                <InputTP24
                    className="w-[20rem]"
                    label={
                        editedIndex === -1
                            ? "Neue Zahlungsart"
                            : "Zahlungsart ändern"
                    }
                    value={editedTypeValue}
                    onChange={handleChange}
                />
                {editedTypeValue && editedTypeValue !== "" && (
                    <Actions
                        edit={editedIndex > -1}
                        addItem={addTypeToList}
                        editItem={changeType}
                        deleteItem={deleteType}
                        cancel={cancel}
                    />
                )}
            </div>
            <Modal modalOpen={deleteModal} openChange={setDeleteModal}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            Zahlungsart löschen
                        </h3>
                    }
                    showHeader
                    footer={
                        <DecisionButtons
                            yesLabel="Löschen"
                            noLabel="Abbrechen"
                            yesAction={deleteTypeConfirm}
                            noAction={cancel}
                        />
                    }
                >
                    <p>
                        Soll die Adresse{" "}
                        <span className="font-bold">"{editedType}"</span>{" "}
                        wirklich gelöscht werden?
                    </p>
                    <p className="flex gap-2">
                        <TriangleAlert className="h-5 w-5  text-destructive" />
                        Diese Aktion kann nicht rückgängig gemacht werden!
                        <TriangleAlert className="h-5 w-5  text-destructive" />
                    </p>
                </ModalCardWrapper>
            </Modal>
        </>
    );
};
