import { Table } from "@tanstack/react-table";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    return (
        <div className="flex items-center py-4 gap-2">
            <Input
                placeholder="Filter ..."
                value={(table.getState().globalFilter as string) ?? ""}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
                className="max-w-sm"
            />
            <Search className="h-6 w-6" />
        </div>
    );
}
