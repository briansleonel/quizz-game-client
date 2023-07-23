import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

interface Props<T> {
    data: Array<T>;
    columnsDef: Array<ColumnDef<T>>;
}

export default function TableGeneric<T>({ data, columnsDef }: Props<T>) {
    const dataMemo = useMemo(() => data, [data]);

    const table = useReactTable({
        data: dataMemo,
        columns: columnsDef,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full">
                <thead className="bg-neutral-800 text-white">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-6 py-2 whitespace-pre font-light text-sm  first:rounded-l last:rounded-r uppercase"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="hover:bg-gray-100 border-b border-gray-200"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-4 py-2 text-center text-sm whitespace-pre"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/*
export function TableContainer({ children }: { children: React.ReactNode }) {
    return <div className="overflow-x-auto">{children}</div>;
}

export function TableContent({ children }: { children: React.ReactNode }) {
    return <table className="w-full">{children}</table>;
}

export function THead({ children }: { children: React.ReactNode }) {
    return <thead className="bg-neutral-800 text-white">{children}</thead>;
}

export function TBody({ children }: { children: React.ReactNode }) {
    return <thead className="bg-neutral-800 text-white">{children}</thead>;
}
*/
