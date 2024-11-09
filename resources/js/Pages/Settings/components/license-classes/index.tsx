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

interface LicenseClassesProps {
    classes: string[];
}

export const LicenseClasses = ({ classes }: LicenseClassesProps) => {
    const { data, setData, patch } = useForm({
        license_classes: classes,
    });

    const [editedIndex, setEditedIndex] = useState(-1);
    const [editedClass, setEditedClass] = useState("");
    const [editedClassValue, setEditedClassValue] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);

    const handleComboChange = (data: PickerReturn) => {
        setEditedClass(data.value + "");
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setEditedClassValue(e.currentTarget.value);
    };

    const editClass = () => {
        const index = data.license_classes.findIndex((item) => {
            return item === editedClass;
        });
        if (index > -1) {
            setEditedIndex(index);
        } else {
            setEditedIndex(index);
            setData((data) => ({ ...data, license_classes: classes }));
        }
        setEditedClassValue(editedClass);
    };

    const cancel = () => {
        setEditedIndex(-1);
        setEditedClass("");
        setEditedClassValue("");
        setDeleteModal(false);
        setData((data) => ({ ...data, license_classes: classes }));
    };

    const addClassToList = () => {
        let array = data.license_classes;
        array.push(editedClassValue);
        setData((data) => ({ ...data, license_classes: array }));
        saveClasses();
    };

    const changeClass = () => {
        let array = data.license_classes;
        array[editedIndex] = editedClassValue;
        setData((data) => ({ ...data, license_classes: array }));
        saveClasses();
    };

    const deleteClass = () => {
        setDeleteModal(true);
    };

    const deleteClassConfirm = () => {
        let array = data.license_classes;
        array.splice(editedIndex, 1);
        setData((data) => ({ ...data, license_classes: array }));
        saveClasses();
        setDeleteModal(false);
    };

    const saveClasses = () => {
        patch("/settings/licenseclasses/1", {
            only: ["settings", "errors"],
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Führerschein Klassen erfolgreich geändert");
                cancel();
            },
            onError: () => {
                toast.error("Fehler beim ändern der Führerschein Klassen");
            },
        });
    };

    useEffect(() => {
        editClass();
    }, [editedClass]);

    return (
        <>
            <div className="flex gap-8">
                <Combobox
                    className="w-[20rem]"
                    items={data.license_classes}
                    label="Auswahl Führerschein Klasse"
                    id="licenseClass"
                    value={editedClass}
                    onValueChange={handleComboChange}
                />
                <InputTP24
                    className="w-[20rem]"
                    label={
                        editedIndex === -1
                            ? "Neue Führerschein Klasse"
                            : "Führerschein Klasse ändern"
                    }
                    value={editedClassValue}
                    onChange={handleChange}
                />
                {editedClassValue && editedClassValue !== "" && (
                    <Actions
                        edit={editedIndex > -1}
                        addItem={addClassToList}
                        editItem={changeClass}
                        deleteItem={deleteClass}
                        cancel={cancel}
                    />
                )}
            </div>
            <Modal modalOpen={deleteModal} openChange={setDeleteModal}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            Führerschein Klasse löschen
                        </h3>
                    }
                    showHeader
                    footer={
                        <DecisionButtons
                            yesLabel="Löschen"
                            noLabel="Abbrechen"
                            yesAction={deleteClassConfirm}
                            noAction={cancel}
                        />
                    }
                >
                    <p>
                        Soll die Adresse{" "}
                        <span className="font-bold">"{editedClass}"</span>{" "}
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
