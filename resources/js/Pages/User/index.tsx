import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { UserProps } from "@/types/user";
import { DataTable } from "@/Components/data-table";
import { columns } from "./columns";
import { ActionButton } from "../../Components/action-button";
import { Modal } from "@/Components/wrapper/modal";

import { UserForm } from "./components/form";
import { useState } from "react";

export default function User({ auth, userList }: UserProps) {
    let currentID = 0;

    const pageTitle = "Benutzerverwaltung";

    const [modalOpen, setModalOpen] = useState(false);

    const addUserModal = () => {
        currentID = 0;
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

            <DataTable columns={columns} data={userList} />
            <Modal modalOpen={modalOpen} openChange={setModalOpen}>
                <UserForm
                    currentID={currentID}
                    close={() => setModalOpen(false)}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
