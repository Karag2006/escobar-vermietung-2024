import { ColumnDef } from "@tanstack/react-table";
import { UserItem } from "@/types/user";

import { Actions } from "./components/actions";
import { DataTableColumnHeader } from "@/Components/data-table/column-header";

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
        cell: ({ row }) => {
            return <Actions row={row} />;
        },
    },
];
