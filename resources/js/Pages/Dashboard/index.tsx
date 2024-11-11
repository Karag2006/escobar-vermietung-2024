import { Head } from "@inertiajs/react";

import { PageProps } from "@/types";
import { Document } from "@/types/document";
import { TrailerItem } from "@/types/trailer";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SimpleTrailerTable } from "./components/SimpleTrailerTable";
import { SimpleReservationTable } from "./components/SimpleReservationTable";

interface DashboardProps extends PageProps {
    nextReservations: Document[];
    nextDueTrailers: TrailerItem[];
    queryParams?: any;
}

export default function Dashboard({
    auth,
    nextReservations,
    nextDueTrailers,
    queryParams,
}: DashboardProps) {
    const pageTitle = "Dashboard";
    return (
        <AuthenticatedLayout user={auth.user} header={pageTitle}>
            <Head title={pageTitle} />
            <div className="flex flex-col gap-6">
                <SimpleTrailerTable trailers={nextDueTrailers} />
                <SimpleReservationTable
                    reservations={nextReservations}
                    queryParams={queryParams}
                />
            </div>
        </AuthenticatedLayout>
    );
}
