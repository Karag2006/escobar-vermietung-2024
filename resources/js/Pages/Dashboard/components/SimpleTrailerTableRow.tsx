import { router } from "@inertiajs/react";
import { format } from "date-fns";

import { Actions } from "@/types";
import { TrailerItem } from "@/types/trailer";

import { TableCell, TableRow } from "@/Components/ui/table";
import { TuevBatch } from "@/Pages/Trailer/components/tuev-batch";
import { ListActions } from "@/Components/Actions/ListActions";

interface SimpleTrailerTableRowProps {
    trailer: TrailerItem;
}

export const SimpleTrailerTableRow = ({
    trailer,
}: SimpleTrailerTableRowProps) => {
    // 04.11.2024 Feature: Inspection List
    // Adding actions to the table row
    const actions: Actions = {
        edit: {
            function: (id: number) => {
                // Move the user to the trailer Page
                // and open the edit form
                router.get(
                    route("trailer"),
                    {},
                    {
                        // Tell the trailer page to open the edit form for the trailer with id: id
                        headers: {
                            openEdit: "" + id,
                        },
                    }
                );
            },
            tooltip: "Anhänger bearbeiten",
        },
        delete: {
            function: (id: number) => {
                console.log("delete", id);
            },
            tooltip: "Anhänger löschen",
        },
        plusOneYear: {
            function: (id: number, years: number = 1) => {
                console.log("plusOneYear", id, years);
            },
            tooltip: "TÜV um ein Jahr verlängern",
        },
        plusTwoYears: {
            function: (id: number, years: number = 2) => {
                console.log("plusTwoYear", id, years);
            },
            tooltip: "TÜV um zwei Jahre verlängern",
        },
    };

    if (!trailer) return null;
    if (!trailer.inspection_at) return null;
    const tuevDate = format(trailer.inspection_at, "MM/yy");

    return (
        <TableRow>
            <TableCell>{trailer.title}</TableCell>
            <TableCell>{trailer.plateNumber}</TableCell>
            <TableCell>
                <TuevBatch tuev={tuevDate} />
            </TableCell>
            <TableCell>
                <ListActions
                    actions={actions}
                    id={trailer.id ? trailer.id : 0}
                />
            </TableCell>
        </TableRow>
    );
};
