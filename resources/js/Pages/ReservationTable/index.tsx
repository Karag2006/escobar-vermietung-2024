import { ReservationTableProps } from "@/types/document";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ActionButton } from "@/Components/action-button";
import { Table } from "./components/table";
import { format, isDate, parse } from "date-fns";
import { de } from "date-fns/locale";

const ReservationTable = ({
    auth,
    reservationList,
    trailers,
    month,
}: ReservationTableProps) => {
    const pageTitle = "Reservierungen";
    const displayDate = isDate(parse(month + "-01", "yyyy-MM-dd", new Date()))
        ? parse(month + "-01", "yyyy-MM-dd", new Date())
        : new Date();

    const displayMonth = format(displayDate, "MMMM", { locale: de });
    const displayYear = format(displayDate, "yyyy", { locale: de });
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={pageTitle}
            headerAction={
                <ActionButton
                    label="Reservierung Anlegen"
                    actionType="add"
                    action={() => {}}
                />
            }
            headerCenter={<div>{displayMonth + " / " + displayYear}</div>}
        >
            <Head title={pageTitle} />
            <Table
                date={displayDate}
                reservationList={reservationList}
                trailers={trailers}
            />
        </AuthenticatedLayout>
    );
};

export default ReservationTable;
