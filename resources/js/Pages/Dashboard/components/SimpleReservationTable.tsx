import { Actions } from "@/types";
import { Document } from "@/types/document";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { SimpleReservationTableRow } from "./SimpleReservationTableRow";
import { downloadPDF } from "@/data/document";
import { router } from "@inertiajs/react";
import { ArchiveButton } from "@/Components/data-table/ArchiveButton";

interface SimpleReservationTableProps {
    reservations: Document[];
    queryParams?: any;
}

export const SimpleReservationTable = ({
    reservations,
    queryParams,
}: SimpleReservationTableProps) => {
    const toggleLoadArchived = () => {
        const url = window.location.pathname;
        if (!queryParams?.showArchived) {
            router.get(`${url}`, { showArchived: true, preserveScroll: true });
        } else {
            router.get(`${url}`, { preserveScroll: true });
        }
    };

    const actions: Actions = {
        edit: {
            function: (id: number) => {
                router.get(
                    "/reservation",
                    {},
                    {
                        headers: {
                            forwardDocument: "" + id,
                        },
                    }
                );
            },
            tooltip: "Reservierung bearbeiten",
        },
        delete: {
            function: (id: number) => {
                console.log("delete", id);
            },
            tooltip: "Reservierung löschen",
        },
        forward: {
            function: (id: number) => {
                console.log("forward", id);
            },
            tooltip: "in Mietvertrag umwandeln",
        },
        print: {
            function: (id: number) => {
                if (id) {
                    downloadPDF(id).then((data) => {
                        const fileURL = data;
                        let link = document.createElement("a");
                        link.href = fileURL;
                        link.target = "_blank";
                        link.setAttribute("open", "");
                        document.body.appendChild(link);

                        link.click();
                    });
                }
            },
            tooltip: "Reservierung als PDF Drucken",
        },
    };
    return (
        <section>
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Nächste Reservierungen</h2>
                <ArchiveButton
                    status={!!queryParams?.showArchived}
                    onClick={toggleLoadArchived}
                />
            </div>

            <Table className="border border-neutral-300 mt-4 rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableHead>Reservierung Nr.</TableHead>
                        <TableHead>Anhänger</TableHead>
                        <TableHead>Kunde</TableHead>
                        <TableHead>Abholung</TableHead>
                        <TableHead>Rückgabe</TableHead>
                        <TableHead>Abholstation</TableHead>
                        <TableHead className="text-end">Aktionen</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reservations
                        ? reservations.map((reservation) => (
                              <SimpleReservationTableRow
                                  key={reservation.id}
                                  reservation={reservation}
                                  actions={actions}
                              />
                          ))
                        : null}
                </TableBody>
            </Table>
        </section>
    );
};
