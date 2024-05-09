import {
    ColumnDef,
    CellContext as TanCellContext,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/data-table/column-header";
import { CustomerItem } from "@/types/customer";
import { Actions } from "./components/actions";

export const columns: ColumnDef<CustomerItem>[] = [
    {
        accessorKey: "name1",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Name 1" />;
        },
    },
    {
        accessorKey: "name2",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Name 2" />;
        },
    },
    {
        accessorKey: "plz",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="PLZ" />;
        },
    },
    {
        accessorKey: "city",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Ort" />;
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
                />
            );
        },
    },
];
