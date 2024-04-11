import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const pageTitle = "Profile";
    return (
        <AuthenticatedLayout user={auth.user} header={pageTitle}>
            <Head title={pageTitle} />
            <div className="sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                <div className="p-4 sm:p-8">
                    <UpdatePasswordForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
