import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Dashboard({ auth }: PageProps) {
    const pageTitle = "Dashboard";
    return (
        <AuthenticatedLayout user={auth.user} header={pageTitle}>
            <Head title={pageTitle} />

            <div className="p-6 text-gray-900">You're logged in!</div>
        </AuthenticatedLayout>
    );
}
