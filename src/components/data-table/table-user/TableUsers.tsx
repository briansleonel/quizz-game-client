"use client";

import TableGeneric from "../TableGeneric";

import userService from "@/services/user.service";
import Pagination from "../Pagination";
import AlertDanger from "../../alert/AlertDanger";
import useDataTable from "@/hooks/useDataTable";
import {
    useChangeVerificationUser,
    useDeleteUserMutation,
} from "@/hooks/useUser";
import { getColumnDefinition } from "./getColumnDef";

//import "rsuite/dist/rsuite.min.css";

export default function TableUsers() {
    const { data, error, isLoading, pagination, setPagination, isFetching } =
        useDataTable({
            functionFetch: userService.getUsers,
            queryKey: "users",
        });

    const deleteUserMutation = useDeleteUserMutation();
    const changeVerifiedMutation = useChangeVerificationUser();

    const handleDeleteUser = async (userId: string) => {
        await deleteUserMutation.mutateAsync(userId);
    };

    const handleChangeVerificationUser = async (userId: string) => {
        await changeVerifiedMutation.mutateAsync(userId);
    };

    const columnDefinition = getColumnDefinition(
        handleDeleteUser,
        handleChangeVerificationUser
    );

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
