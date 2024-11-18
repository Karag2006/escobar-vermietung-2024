import { Head } from "@inertiajs/react";

import { PageProps } from "@/types";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";

const jsonIndex = ({ auth }: PageProps) => {
    const pageTitle = "Rechnungstext in lesbaren Text umwandeln";
    if (auth && auth.user) {
        return (
            <AuthenticatedLayout user={auth.user} header={pageTitle}>
                <Head title={pageTitle} />
            </AuthenticatedLayout>
        );
    }

    return (
        <GuestLayout>
            <Head title={pageTitle} />
        </GuestLayout>
    );
};

export default jsonIndex;
