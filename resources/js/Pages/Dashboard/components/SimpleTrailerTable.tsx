import { format } from "date-fns";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { TrailerItem } from "@/types/trailer";
import { SimpleTrailerTableRow } from "./SimpleTrailerTableRow";

interface SimpleTrailerTableProps {
    trailers: TrailerItem[];
}

export const SimpleTrailerTable = ({ trailers }: SimpleTrailerTableProps) => {
    return (
        <section>
            <h2 className="font-bold text-xl">
                Nächste Anhänger die Tüv brauchen
            </h2>
            <Table className="border border-neutral-300 mt-4 rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableHead>Anhänger </TableHead>
                        <TableHead>Kennzeichen</TableHead>
                        <TableHead>Tüv bis</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trailers
                        ? trailers.map((trailer) => (
                              <SimpleTrailerTableRow
                                  trailer={trailer}
                                  key={trailer.id}
                              />
                          ))
                        : null}
                </TableBody>
            </Table>
        </section>
    );
};
