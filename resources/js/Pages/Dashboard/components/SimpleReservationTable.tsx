import { format } from "date-fns";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { Document } from "@/types/document";

interface SimpleReservationTableProps {
    reservations: Document[];
}

export const SimpleReservationTable = ({
    reservations,
}: SimpleReservationTableProps) => {
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
                              <TableRow key={reservation.id}>
                                  <TableCell>
                                      {reservation.reservation_number}
                                  </TableCell>
                                  <TableCell>
                                      {reservation.customer_name1}
                                  </TableCell>
                                  <TableCell>
                                      {reservation.collect_at
                                          ? format(
                                                reservation.collect_at,
                                                "dd.MM.yyyy HH:mm"
                                            )
                                          : null}
                                  </TableCell>
                                  <TableCell>
                                      {reservation.collect_address.name
                                          ? reservation.collect_address.name
                                          : null}
                                  </TableCell>
                                  <TableCell>
                                      {reservation.return_at
                                          ? format(
                                                reservation.return_at,
                                                "dd.MM.yyyy HH:mm"
                                            )
                                          : null}
                                  </TableCell>
                              </TableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
        </section>
    );
};
