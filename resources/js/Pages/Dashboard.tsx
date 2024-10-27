import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Document } from "@/types/document";
import { format } from "date-fns";

interface DashboardProps extends PageProps {
    nextReservations: Document[];
}

export default function Dashboard({ auth, nextReservations }: DashboardProps) {
    const pageTitle = "Dashboard";
    return (
        <AuthenticatedLayout user={auth.user} header={pageTitle}>
            <Head title={pageTitle} />

            <h2 className="font-bold text-xl">Next Reservations</h2>

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
                    {nextReservations
                        ? nextReservations.map((reservation) => (
                              <TableRow key={reservation.id}>
                                  <TableCell>
                                      {reservation.reservation_number}
                                  </TableCell>
                                  <TableCell>
                                      {reservation.customer_name1}
                                  </TableCell>
                                  <TableCell>
                                      {reservation.collectAt
                                          ? format(
                                                reservation.collectAt,
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
                                      {reservation.returnAt
                                          ? format(
                                                reservation.returnAt,
                                                "dd.MM.yyyy HH:mm"
                                            )
                                          : null}
                                  </TableCell>
                              </TableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
        </AuthenticatedLayout>
    );
}
