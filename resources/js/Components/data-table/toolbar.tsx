import { Table } from "@tanstack/react-table";

import { Search } from "lucide-react";

import { InputTP24 } from "@/Components/ui/input-tp24";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    return (
        <div className="flex items-center py-4 gap-2">
            <InputTP24
                label="Filter"
                value={(table.getState().globalFilter as string) ?? ""}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
                className="max-w-sm"
            />
            <Search className="h-6 w-6" />
        </div>
    );
}
