import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import { collectAddressSchema } from "@/types/collect-address";

import { getAddressById } from "@/data/collect-address";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { DataTablePagination } from "@/Components/data-table/pagination";
import { DataTableToolbar } from "@/Components/data-table/toolbar";
import { InputTP24 } from "@/Components/ui/input-tp24";

import { FormActions } from "./form-actions";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    editRow?: number;
    deleteModal?: (id: number) => void;
}
declare module "@tanstack/react-table" {
    interface CellContext<TData, TValue> {
        editRow?: number;
        editStart: (id: number) => void;
        deleteModal?: (id: number) => void;
    }
}

export function DataTable<TData, TValue>({
    columns,
    data,
    editRow,
    deleteModal,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [currentID, setCurrentID] = useState(0);

    const Form = useForm({
        id: currentID,
        name: "",
        address: "",
    });
    const editStart = (identifier: number) => {
        setCurrentID(identifier);
    };

    const cancelEdit = () => {
        setCurrentID(0);
        Form.setData((data) => ({ ...data, id: 0, name: "", address: "" }));
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        Form.setData((data) => ({
            ...data,
            [key]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Form.data.id === 0) {
            Form.post("/collectaddress", {
                only: ["collectAddressList", "errors"],
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Adresse erfolgreich angelegt");
                    cancelEdit();
                },
                onError: () => {
                    toast.error("Fehler beim anlegen der Adresse");
                },
            });
        } else {
            Form.patch(`/collectaddress/${Form.data.id}`, {
                only: ["collectAddressList", "errors"],
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Adresse erfolgreich geändert");
                    cancelEdit();
                },
                onError: () => {
                    toast.error("Fehler beim ändern der Adresse");
                },
            });
        }
    };

    useEffect(() => {
        const getCurrentAddress = () => {
            if (currentID && currentID !== 0) {
                getAddressById(currentID).then((address) =>
                    Form.setData({ ...address })
                );
            }
        };
        getCurrentAddress();
        return;
    }, [currentID]);

    const table = useReactTable({
        data,
        columns,
        enableRowSelection: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
    });

    return (
        <div>
            <DataTableToolbar table={table} />
            <div className="rounded-md border mb-4">
                <form onSubmit={handleSubmit}>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {currentID ===
                                        collectAddressSchema.parse(row.original)
                                            .id ? (
                                            <>
                                                <TableCell>
                                                    <InputTP24
                                                        value={Form.data.name}
                                                        id="name"
                                                        onChange={handleChange}
                                                        error={Form.errors.name}
                                                        onFocus={() =>
                                                            Form.clearErrors(
                                                                "name"
                                                            )
                                                        }
                                                        disabled={
                                                            Form.processing
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <InputTP24
                                                        value={
                                                            Form.data.address
                                                        }
                                                        id="address"
                                                        onChange={handleChange}
                                                        error={
                                                            Form.errors.address
                                                        }
                                                        onFocus={() =>
                                                            Form.clearErrors(
                                                                "address"
                                                            )
                                                        }
                                                        disabled={
                                                            Form.processing
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormActions
                                                        cancelEdit={cancelEdit}
                                                    />
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                            className=""
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                {
                                                                    ...cell.getContext(),
                                                                    editRow,
                                                                    editStart,
                                                                    deleteModal,
                                                                }
                                                            )}
                                                        </TableCell>
                                                    ))}
                                            </>
                                        )}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                            {currentID === 0 && (
                                <TableRow>
                                    <TableCell>
                                        <InputTP24
                                            value={Form.data.name}
                                            label="Name"
                                            id="name"
                                            onChange={handleChange}
                                            error={Form.errors.name}
                                            onFocus={() =>
                                                Form.clearErrors("name")
                                            }
                                            disabled={Form.processing}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <InputTP24
                                            value={Form.data.address}
                                            label="Adresse"
                                            id="address"
                                            onChange={handleChange}
                                            error={Form.errors.address}
                                            onFocus={() =>
                                                Form.clearErrors("address")
                                            }
                                            disabled={Form.processing}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormActions cancelEdit={cancelEdit} />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </form>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
