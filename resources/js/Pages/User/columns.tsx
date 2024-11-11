import {
    ColumnDef,
    CellContext as TanCellContext,
} from "@tanstack/react-table";
import { UserItem } from "@/types/user";

import { DataTableColumnHeader } from "@/Components/data-table/column-header";
import { ListActions } from "@/Components/Actions/ListActions";

type CellContext<TData, TValue> = TanCellContext<TData, TValue> & {
    editModal: (id: number) => void;
};

export const columns: ColumnDef<UserItem>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Benutzername" />
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Name" />;
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="E-Mail" />;
        },
    },
    {
        id: "actions",
        cell: (cell) => {
            return (
                <ListActions
                    actions={cell.actions}
                    id={cell.row.original.id ? cell.row.original.id : 0}
                />
            );
        },
    },
];
