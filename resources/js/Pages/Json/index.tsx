import Guest from "@/Layouts/GuestLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { JsonForm } from "./components/JsonForm";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Json = ({ auth }: PageProps) => {
    const pageTitle = "Rechnungskauf Textumwandlung";
    if (auth.user)
        return (
            <Authenticated user={auth.user} header={pageTitle}>
                <Head title={pageTitle} />
                <JsonForm />
            </Authenticated>
        );

    return (
        <Guest>
            <Head title={pageTitle} />
            <h2 className="text-2xl font-bold">{pageTitle}</h2>
            <JsonForm />
        </Guest>
    );
};

export default Json;
