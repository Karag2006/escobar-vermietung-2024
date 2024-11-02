import { format } from "date-fns";

import { Document } from "@/types/document";

import { TableCell, TableRow } from "@/Components/ui/table";

import { ListActions } from "@/Components/Actions/ListActions";
import { Actions } from "@/types";

interface SimpleReservationTableRowProps {
    reservation: Document;
    actions: Actions;
}

export const SimpleReservationTableRow = ({
    reservation,
    actions,
}: SimpleReservationTableRowProps) => {
    if (!reservation) return null;
    if (!reservation.id) return null;
    return (
        <TableRow key={reservation.id}>
            <TableCell>{reservation.reservation_number}</TableCell>
            <TableCell>{reservation.customer_name1}</TableCell>
            <TableCell>
                {reservation.collect_at
                    ? format(reservation.collect_at, "dd.MM.yyyy HH:mm")
                    : null}
            </TableCell>
            <TableCell>
                {reservation.collect_address.name
                    ? reservation.collect_address.name
                    : null}
            </TableCell>
            <TableCell>
                {reservation.return_at
                    ? format(reservation.return_at, "dd.MM.yyyy HH:mm")
                    : null}
            </TableCell>
            <TableCell>
                <ListActions id={reservation.id} actions={actions} />
            </TableCell>
        </TableRow>
    );
};
