"use client";

import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import {
    Check,
    HandThumbsDown,
    HandThumbsUp,
    PencilSquare,
    Trash3Fill,
    X,
} from "react-bootstrap-icons";
import TableGeneric from "./TableGeneric";

import userService from "@/services/user.service";
import Pagination from "./Pagination";
import AlertDanger from "../alert/AlertDanger";
import useDataTable from "@/hooks/useDataTable";
import Button from "../button/ButtonPrimary";
import useDeleteUserMutation from "@/hooks/useUser";

//import "rsuite/dist/rsuite.min.css";

export default function TableUsers() {
    const { data, error, isLoading, pagination, setPagination, isFetching } =
        useDataTable({
            functionFetch: userService.getUsers,
            queryKey: "users",
        });

    const deleteUserMutation = useDeleteUserMutation();

    const handleDeleteUser = async (userId: string) => {
        await deleteUserMutation.mutateAsync(userId);
    };

    const columnDefinition: Array<ColumnDef<IUser>> = [
        {
            accessorFn: (row) => `${row.lastName}, ${row.firstName}`,
            accessorKey: "fullName",
            header: "Nombre completo",
        },
        {
            accessorFn: (row) => row.username,
            accessorKey: "username",
            header: "Nombre de usuario",
        },

        {
            accessorFn: (row) => row.email,
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorFn: (row) => row.role,
            accessorKey: "role",
            header: "Rol",
        },
        {
            cell: (row) => (
                <span className="w-full h-full flex justify-center">
                    {row.getValue() ? (
                        <Check className="text-green-500 w-6 h-6" />
                    ) : (
                        <X className="text-red-500 w-6 h-6" />
                    )}
                </span>
            ),
            accessorKey: "verified",
            header: "Verificado",
        },
        {
            cell: (row) => {
                const verified = row.row.original.verified;
                const id = row.row.original._id;

                return (
                    <div className="flex gap-2 justify-center">
                        <Button
                            className="bg-yellow-500 hover:bg-yellow-400"
                            title="Editar"
                        >
                            <PencilSquare />
                        </Button>
                        <Button
                            className="bg-red-600 hover:bg-red-500"
                            title="Eliminar"
                            onClick={() => handleDeleteUser(id)}
                        >
                            <Trash3Fill />
                        </Button>
                        <Button
                            className="bg-sky-600 hover:bg-sky-500"
                            title="Cambiar verificación"
                        >
                            {verified ? <HandThumbsDown /> : <HandThumbsUp />}
                        </Button>
                    </div>
                );
            },
            accessorKey: "actions",
            header: "Acciones",
        },
    ];

    return (
        <>
            {error && error instanceof Error ? (
                <AlertDanger>Error: {error.message}</AlertDanger>
            ) : isLoading ? (
                <p>Cargando data table...</p>
            ) : (
                <>
                    {/*isFetching ? <div>Refreshing...</div> : null*/}
                    {/** Muestro los datos de la tabla */}
                    {data ? (
                        <TableGeneric
                            columnsDef={columnDefinition}
                            data={data.data}
                        />
                    ) : null}

                    {/** Muestro la paginación de datos */}
                    {pagination ? (
                        <Pagination
                            pagination={pagination}
                            setPagination={setPagination}
                        />
                    ) : null}
                </>
            )}
        </>
    );
}
