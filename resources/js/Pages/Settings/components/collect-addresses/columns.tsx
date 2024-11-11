import {
    ColumnDef,
    CellContext as TanCellContext,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/data-table/column-header";
import { CollectAddressItem } from "@/types/collect-address";
import { Actions } from "./actions";

export const columns: ColumnDef<CollectAddressItem>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Name" />;
        },
        cell: ({ row }) => {
            return <div className="max-w-[500px]">{row.getValue("name")}</div>;
        },
    },
    {
        accessorKey: "address",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Adresse" />;
        },
        cell: ({ row }) => {
            return <div className="w-max">{row.getValue("address")}</div>;
        },
    },

    {
        id: "actions",
        cell: (cell) => {
            return (
                <Actions
                    row={cell.row}
                    editRow={cell.editRow}
                    editStart={cell.editStart}
                    deleteModal={cell.deleteModal}
                    className="w-max ml-auto"
                />
            );
        },
    },
];
