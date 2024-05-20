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

import { DocumentProps } from "@/types/document";
import { getOfferById } from "@/data/document";
import { DocumentForm } from "./components/form";
import { offerColumns } from "./offer-columns";

export default function User({ auth, offerList, type }: DocumentProps) {
    const pageTitle = "Angebote";
    const [confirmModal, setConfirmModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentID, setCurrentID] = useState(0);
    const [deleteName, setDeleteName] = useState("");
    const Form = useForm({
        id: currentID,
    });

    const addDocumentModal = () => {
        setCurrentID(0);
        setModalOpen(true);
    };

    const editDocumentModal = (id: number) => {
        setCurrentID(id);
        setModalOpen(true);
    };

    const deleteModal = (id: number) => {
        setCurrentID(id);
        if (offerList) {
            getOfferById(id).then((offer) => {
                setDeleteName(offer.offer_number);
            });
        }
        setConfirmModal(true);
    };

    const confirmDelete = (id?: number) => {
        if (offerList) {
            Form.delete(`/offer/${id}`, {
                only: ["offerList"],
                onSuccess: (page) => {
                    toast.success("Angebot gelöscht");
                    setConfirmModal(false);
                },
            });
        }
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
                    label="Angebot hinzufügen"
                    actionType="add"
                    action={addDocumentModal}
                />
            }
        >
            <Head title={pageTitle} />

            {offerList && (
                <DataTable
                    columns={offerColumns}
                    data={offerList}
                    editModal={editDocumentModal}
                    deleteModal={deleteModal}
                />
            )}
            <Modal modalOpen={confirmModal} openChange={setConfirmModal}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            Angebot löschen
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
                        Soll das Angebot{" "}
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
                            {type === "offer"
                                ? currentID === 0
                                    ? "Angebot Anlegen"
                                    : "Angebot bearbeiten"
                                : null}
                        </h3>
                    }
                    showHeader
                >
                    <DocumentForm
                        currentID={currentID}
                        close={() => setModalOpen(false)}
                        documentType={type}
                    />
                </ModalCardWrapper>
            </Modal>
        </AuthenticatedLayout>
    );
}
