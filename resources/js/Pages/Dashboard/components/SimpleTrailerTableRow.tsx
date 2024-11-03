import { format } from "date-fns";

import { TrailerItem } from "@/types/trailer";

import { TableCell, TableRow } from "@/Components/ui/table";
import { TuevBatch } from "@/Pages/Trailer/components/tuev-batch";

interface SimpleTrailerTableRowProps {
    trailer: TrailerItem;
}

export const SimpleTrailerTableRow = ({
    trailer,
}: SimpleTrailerTableRowProps) => {
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
            <TableCell></TableCell>
        </TableRow>
    );
};
