import {
    ColumnDef,
    CellContext as TanCellContext,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/data-table/column-header";
import { TrailerItem } from "@/types/trailer";
import { Actions } from "./components/actions";
import { TuevBatch } from "./components/tuev-batch";
import { LoadingSizeDisplay } from "./components/loading-size-display";
import { WeightDisplay } from "./components/weight-display";

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
        cell: (cell) => {
            return (
                <WeightDisplay
                    weight={cell.row.original.totalWeight}
                    unit="kg"
                />
            );
        },
    },
    {
        accessorKey: "usableWeight",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Nutzlast" />;
        },
        cell: (cell) => {
            return (
                <WeightDisplay
                    weight={cell.row.original.usableWeight}
                    unit="kg"
                />
            );
        },
    },
    {
        accessorKey: "loading_size",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Lademaße" />;
        },
        cell: (cell) => {
            return (
                <LoadingSizeDisplay
                    loadingSize={cell.row.original.loading_size}
                />
            );
        },
    },
    {
        accessorKey: "tuev",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Tüv" />;
        },
        cell: (cell) => {
            return <TuevBatch tuev={cell.row.original.tuev} />;
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
