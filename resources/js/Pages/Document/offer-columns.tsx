import {
    ColumnDef,
    CellContext as TanCellContext,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/data-table/column-header";

import { Actions } from "./components/actions";
import { Document } from "@/types/document";

export const offerColumns: ColumnDef<Document>[] = [
    {
        accessorKey: "offer_number",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Nummer" />;
        },
    },
    {
        accessorKey: "customer_name1",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Kunde" />;
        },
    },
    {
        accessorKey: "vehicle_title",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Anhänger" />;
        },
    },
    {
        accessorKey: "vehicle_plateNumber",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Kennzeichen" />
            );
        },
    },
    {
        accessorKey: "collect_date",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Abholdatum" />;
        },
    },
    {
        accessorKey: "return_date",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Rückgabedatum" />
            );
        },
    },
    {
        id: "collect_address",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Abhol Adresse" />
            );
        },
        cell: (cell) => {
            return <span>{cell.row.original.collect_address.name}</span>;
        },
    },
    {
        id: "actions",
        cell: (cell) => {
            return (
                <Actions
                    row={cell.row}
                    editModal={cell.editModal}
                    deleteModal={cell.deleteModal}
                    forwardModal={cell.forwardModal}
                />
            );
        },
    },
];
