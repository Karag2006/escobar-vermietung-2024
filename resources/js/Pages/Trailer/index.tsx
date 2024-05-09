import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";

import { TriangleAlert } from "lucide-react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { DataTable } from "@/Components/data-table";
import { ActionButton } from "@/Components/action-button";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { DecisionButtons } from "@/Components/decision-buttons";

import { columns } from "./columns";
import { TrailerProps } from "@/types/trailer";
import { getTrailerById } from "@/data/trailer";
import { CustomerForm } from "./components/form";

export default function User({ auth, trailers }: TrailerProps) {
    const pageTitle = "Anhänger";
    const [confirmModal, setConfirmModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentID, setCurrentID] = useState(0);
    const [deleteName, setDeleteName] = useState("");
    const Form = useForm({
        id: currentID,
    });

    const addTrailerModal = () => {
        setCurrentID(0);
        setModalOpen(true);
    };

    const editTrailerModal = (id: number) => {
        setCurrentID(id);
        setModalOpen(true);
    };

    const deleteModal = (id: number) => {
        setCurrentID(id);
        getTrailerById(id).then((trailer) => {
            setDeleteName(trailer.plateNumber);
        });
        setConfirmModal(true);
    };

    const confirmDelete = (id?: number) => {
        Form.delete(`/trailer/${id}`, {
            only: ["trailers"],
            onSuccess: (page) => {
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
                    label="Anhänger Anlegen"
                    actionType="add"
                    action={addTrailerModal}
                />
            }
        >
            <Head title={pageTitle} />

            <DataTable
                columns={columns}
                data={trailers}
                editModal={editTrailerModal}
                deleteModal={deleteModal}
            />
            <Modal modalOpen={confirmModal} openChange={setConfirmModal}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            Anhänger löschen
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
                        Soll der Anhänger mit dem Kennzeichen{" "}
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
                                ? "Anhänger Anlegen"
                                : "Anhänger bearbeiten"}
                        </h3>
                    }
                    showHeader
                >
                    <CustomerForm
                        currentID={currentID}
                        close={() => setModalOpen(false)}
                    />
                </ModalCardWrapper>
            </Modal>
        </AuthenticatedLayout>
    );
}
