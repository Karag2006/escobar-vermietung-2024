import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { UserProps } from "@/Pages/User/types/user";
import { DataTable } from "@/Components/data-table";
import { columns } from "./columns";
import { ActionButton } from "../../Components/action-button";

export default function User({ auth, userList }: UserProps) {
    const pageTitle = "Benutzerverwaltung";
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={pageTitle}
            headerAction={
                <ActionButton
                    label="Benutzer"
                    actionType="add"
                    action={() => {
                        console.log("test");
                    }}
                />
            }
        >
            <Head title={pageTitle} />

            <DataTable columns={columns} data={userList} />
        </AuthenticatedLayout>
    );
}
