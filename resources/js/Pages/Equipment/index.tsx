import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

import { TriangleAlert } from "lucide-react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTable } from "@/Components/data-table";
import { ActionButton } from "@/Components/action-button";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { DecisionButtons } from "@/Components/decision-buttons";

import { columns } from "./columns";
import { EquipmentProps } from "@/types/equipment";
import { getEquipmentById } from "@/data/equipment";
import { EquipmentForm } from "./components/form";
import { Actions } from "@/types";

export default function User({ auth, equipmentList }: EquipmentProps) {
    const pageTitle = "Zubehörliste";
    const [confirmModal, setConfirmModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentID, setCurrentID] = useState(0);
    const [deleteName, setDeleteName] = useState("");
    const Form = useForm({
        id: currentID,
    });

    const actions: Actions = {
        edit: {
            function: (id: number) => editEquipmentModal(id),
            tooltip: "Zubehör bearbeiten",
        },
        delete: {
            function: (id: number) => deleteModal(id),
            tooltip: "Zubehör löschen",
        },
    };

    const addEquipmentModal = () => {
        setCurrentID(0);
        setModalOpen(true);
    };

    const editEquipmentModal = (id: number) => {
        setCurrentID(id);
        setModalOpen(true);
    };

    const deleteModal = (id: number) => {
        setCurrentID(id);
        getEquipmentById(id).then((equipment) => {
            setDeleteName(equipment.name);
        });
        setConfirmModal(true);
    };

    const confirmDelete = (id?: number) => {
        Form.delete(`/equipment/${id}`, {
            only: ["equipmentList"],
            onSuccess: () => {
                toast.success("Zubehör gelöscht");
                setConfirmModal(false);
            },
        });
    };

    const cancelDelete = () => {
        setConfirmModal(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={pageTitle}
            headerAction={
                <ActionButton
                    label="Zubehör Anlegen"
                    actionType="add"
                    action={addEquipmentModal}
                />
            }
        >
            <Head title={pageTitle} />

            <DataTable
                columns={columns}
                data={equipmentList}
                actions={actions}
            />
            <Modal modalOpen={confirmModal} openChange={setConfirmModal}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            Zubehör löschen
                        </h3>
                    }
                    showHeader
                    footer={
                        <DecisionButtons
                            yesLabel="Löschen"
                            noLabel="Abbrechen"
                            id={currentID}
                            yesAction={confirmDelete}
                            noAction={cancelDelete}
                        />
                    }
                >
                    <p>
                        Soll das Zubehör{" "}
                        <span className="font-bold">"{deleteName}"</span>{" "}
                        wirklich gelöscht werden?
                    </p>
                    <p className="flex gap-2">
                        <TriangleAlert className="h-5 w-5  text-destructive" />
                        Diese Aktion kann nicht rückgängig gemacht werden!
                        <TriangleAlert className="h-5 w-5  text-destructive" />
                    </p>
                </ModalCardWrapper>
            </Modal>
            <Modal modalOpen={modalOpen} openChange={setModalOpen}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            {currentID === 0
                                ? "Zubehör Anlegen"
                                : "Zubehör bearbeiten"}
                        </h3>
                    }
                    showHeader
                >
                    <EquipmentForm
                        currentID={currentID}
                        close={() => setModalOpen(false)}
                    />
                </ModalCardWrapper>
            </Modal>
        </AuthenticatedLayout>
    );
}
