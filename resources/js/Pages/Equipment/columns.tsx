import {
    ColumnDef,
    CellContext as TanCellContext,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/data-table/column-header";
import { EquipmentItem } from "@/types/equipment";
import { Actions } from "./components/actions";

export const columns: ColumnDef<EquipmentItem>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Bezeichnung" />
            );
        },
    },
    {
        accessorKey: "defaultNumber",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title="Standard Anzahl"
                />
            );
        },
    },
    {
        accessorKey: "details",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Details" />;
        },
    },
    // {
    //     id: "actions",
    //     cell: (cell) => {
    //         return (
    //             <Actions
    //                 row={cell.row}
    //                 editModal={cell.editModal}
    //                 deleteModal={cell.deleteModal}
    //             />
    //         );
    //     },
    // },
];
