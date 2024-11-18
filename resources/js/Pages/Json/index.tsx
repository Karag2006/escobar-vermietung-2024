import { Head } from "@inertiajs/react";

import { PageProps } from "@/types";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { JSONForm } from "./components/jsonForm";

const jsonIndex = ({ auth }: PageProps) => {
    const pageTitle = "Rechnungskauf Textumwandlung";
    if (auth && auth.user) {
        return (
            <AuthenticatedLayout user={auth.user} header={pageTitle}>
                <Head title={pageTitle} />
                <JSONForm />
            </AuthenticatedLayout>
        );
    }

    return (
        <GuestLayout>
            <Head title={pageTitle} />
            <JSONForm />
        </GuestLayout>
    );
};

export default jsonIndex;
