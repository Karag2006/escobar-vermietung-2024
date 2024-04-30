import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

import { UserProps } from "@/types/user";
import { DataTable } from "@/Components/data-table";
import { columns } from "./columns";
import { ActionButton } from "../../Components/action-button";
import { Modal } from "@/Components/wrapper/modal";

import { UserForm } from "./components/form";
import { useState } from "react";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";

import { DecisionButtons } from "@/Components/decision-buttons";
import { TriangleAlert } from "lucide-react";
import { getUserById } from "@/data/user";

export default function User({ auth, userList }: UserProps) {
    const pageTitle = "Benutzerverwaltung";
    const [confirmModal, setConfirmModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentID, setCurrentID] = useState(0);
    const [deleteName, setDeleteName] = useState("");
    const Form = useForm({
        id: currentID,
    });

    const addUserModal = () => {
        setCurrentID(0);
        setModalOpen(true);
    };

    const editUserModal = (id: number) => {
        setCurrentID(id);
        setModalOpen(true);
    };

    const deleteModal = (id: number) => {
        setCurrentID(id);
        getUserById(id).then((user) => {
            setDeleteName(user.username);
        });
        setConfirmModal(true);
    };

    const confirmDelete = (id?: number) => {
        console.log("confirm " + id);
        Form.delete(`/user/${id}`, {
            only: ["userList"],
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
                    label="Benutzer"
                    actionType="add"
                    action={addUserModal}
                />
            }
        >
            <Head title={pageTitle} />

            <DataTable
                columns={columns}
                data={userList}
                editModal={editUserModal}
                deleteModal={deleteModal}
            />
            <Modal modalOpen={confirmModal} openChange={setConfirmModal}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            Benutzer löschen
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
                        Soll der Benutzer{" "}
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
                                ? "Benutzer Anlegen"
                                : "Benutzer bearbeiten"}
                        </h3>
                    }
                    showHeader
                >
                    <UserForm
                        currentID={currentID}
                        close={() => setModalOpen(false)}
                    />
                </ModalCardWrapper>
            </Modal>
        </AuthenticatedLayout>
    );
}
