import { Table } from "@tanstack/react-table";

import { Search } from "lucide-react";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { Link, router } from "@inertiajs/react";
import { Button } from "../ui/button";
import { ArchiveButton } from "./ArchiveButton";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    queryParams?: any;
}

export function DataTableToolbar<TData>({
    table,
    queryParams,
}: DataTableToolbarProps<TData>) {
    const toggleLoadArchived = () => {
        const url = window.location.pathname;
        if (!queryParams?.showArchived) {
            router.get(`${url}`, { showArchived: true, preserveScroll: true });
        } else {
            router.get(`${url}`, { preserveScroll: true });
        }
    };

    const hasArchive = [
        "/offer",
        "/reservation",
        "/contract",
        "/dashboard",
    ].includes(window.location.pathname);

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center py-4 gap-2">
                <InputTP24
                    label="Filter"
                    value={(table.getState().globalFilter as string) ?? ""}
                    onChange={(event) =>
                        table.setGlobalFilter(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Search className="h-6 w-6" />
            </div>
            <div>
                {hasArchive ? (
                    <ArchiveButton
                        status={!!queryParams?.showArchived}
                        onClick={toggleLoadArchived}
                    />
                ) : null}
            </div>
        </div>
    );
}
