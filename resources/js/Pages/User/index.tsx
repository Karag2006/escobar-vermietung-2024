import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { UserProps } from "@/types/user";
import { DataTable } from "@/Components/data-table";
import { columns } from "./columns";
import { ActionButton } from "../../Components/action-button";
import { Modal } from "@/Components/wrapper/modal";

import { UserForm } from "./components/form";
import { useState } from "react";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";

export default function User({ auth, userList }: UserProps) {
    const pageTitle = "Benutzerverwaltung";
    const [modalOpen, setModalOpen] = useState(false);
    const [currentID, setCurrentID] = useState(0);

    const addUserModal = () => {
        setCurrentID(0);
        setModalOpen(true);
    };

    const editUserModal = (id: number) => {
        setCurrentID(id);
        setModalOpen(true);
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
            />
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
