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
import { getOfferById, getReservationById } from "@/data/document";
import { DocumentForm } from "./components/form";
import { offerColumns } from "./offer-columns";
import {
    getDocumentPluralTypeTranslation,
    getDocumentTypeArticle,
    getDocumentTypeTranslation,
} from "@/lib/utils";
import { reservationColumns } from "./reservation-columns";

export default function Document({
    auth,
    offerList,
    reservationList,
    contractList,
    type,
}: DocumentProps) {
    const germanDocumentType = getDocumentTypeTranslation(type);
    const germanDocumentTypePlural = getDocumentPluralTypeTranslation(type);
    const germanDocumentTypeArticle = getDocumentTypeArticle(type);
    const pageTitle = germanDocumentTypePlural;
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
        if (type === "offer") {
            getOfferById(id).then((offer) => {
                setDeleteName(offer.data.offer_number);
            });
        }
        if (type === "reservation") {
            getReservationById(id).then((reservation) => {
                setDeleteName(reservation.data.reservation_number);
            });
        }
        setConfirmModal(true);
    };

    const confirmDelete = (id?: number) => {
        if (type === "offer") {
            Form.delete(`/offer/${id}`, {
                only: ["offerList"],
                onSuccess: (page) => {
                    onDeleteSuccess();
                },
            });
        }
        if (type === "reservation") {
            Form.delete(`/reservation/${id}`, {
                only: ["reservationList"],
                onSuccess: (page) => {
                    onDeleteSuccess();
                },
            });
        }
    };

    const onDeleteSuccess = () => {
        toast.success(`${germanDocumentType} gelöscht`);
        setConfirmModal(false);
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
                    label={`${germanDocumentType} hinzufügen`}
                    actionType="add"
                    action={addDocumentModal}
                />
            }
        >
            <Head title={pageTitle} />

            {type === "offer" && (
                <DataTable
                    columns={offerColumns}
                    data={offerList}
                    editModal={editDocumentModal}
                    deleteModal={deleteModal}
                />
            )}
            {type === "reservation" && (
                <DataTable
                    columns={reservationColumns}
                    data={reservationList}
                    editModal={editDocumentModal}
                    deleteModal={deleteModal}
                />
            )}
            <Modal modalOpen={confirmModal} openChange={setConfirmModal}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            {germanDocumentType} löschen
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
                        {`Soll ${germanDocumentTypeArticle} ${germanDocumentType} `}
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
            <Modal
                className="xl:max-w-[1600px]"
                modalOpen={modalOpen}
                openChange={setModalOpen}
            >
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            {currentID === 0
                                ? `${germanDocumentType} anlegen`
                                : `${germanDocumentType} bearbeiten`}
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
