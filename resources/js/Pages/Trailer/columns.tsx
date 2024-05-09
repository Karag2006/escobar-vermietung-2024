import {
    ColumnDef,
    CellContext as TanCellContext,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/data-table/column-header";
import { TrailerItem } from "@/types/trailer";
import { Actions } from "./components/actions";

export const columns: ColumnDef<TrailerItem>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Anhänger" />;
        },
    },
    {
        accessorKey: "plateNumber",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Kennzeichen" />
            );
        },
    },
    {
        accessorKey: "totalWeight",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="zul. GG." />;
        },
    },
    {
        accessorKey: "usableWeight",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Nutzlast" />;
        },
    },
    {
        accessorKey: "loading_size",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Lademaße" />;
        },
    },
    {
        accessorKey: "tuev",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Tüv" />;
        },
    },
    {
        id: "actions",
        cell: (cell) => {
            // return (
            //     <Actions
            //         row={cell.row}
            //         editModal={cell.editModal}
            //         deleteModal={cell.deleteModal}
            //     />
            // );
        },
    },
];
