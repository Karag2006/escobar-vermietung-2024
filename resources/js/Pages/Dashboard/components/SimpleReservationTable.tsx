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

interface SimpleReservationTableProps {
    reservations: Document[];
}

export const SimpleReservationTable = ({
    reservations,
}: SimpleReservationTableProps) => {
    const actions: Actions = {
        edit: {
            function: (id: number) => {
                console.log("edit", id);
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
                console.log("print", id);
            },
            tooltip: "Reservierung als PDF Drucken",
        },
    };
    return (
        <section>
            <h2 className="font-bold text-xl">Nächste Reservierungen</h2>

            <Table className="border border-neutral-300 mt-4 rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableHead>Reservation Number</TableHead>
                        <TableHead>Kunde</TableHead>
                        <TableHead>Abholung</TableHead>
                        <TableHead>Abholstation</TableHead>
                        <TableHead>Rückgabe</TableHead>
                        <TableHead>Aktionen</TableHead>
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
