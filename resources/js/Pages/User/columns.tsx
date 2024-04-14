import { ColumnDef } from "@tanstack/react-table";
import { UserItem } from "@/Pages/User/types/user";

import { Actions } from "./components/actions";

export const columns: ColumnDef<UserItem>[] = [
    {
        accessorKey: "username",
        header: "Benutzername",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "E-Mail",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return <Actions row={row} />;
        },
    },
];
