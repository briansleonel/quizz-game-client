"use client";

import AlertDanger from "@/components/alert/AlertDanger";
import TableGeneric from "../TableGeneric";
import { getColumnDefinitionCategory } from "./getColumnDef";
import { useDeleteCategoryMutation } from "@/hooks/useQuestionCategory";
import { useDataTableCategory } from "@/hooks/useDataTable";
import Pagination from "../Pagination";

export default function TableQuestionCategory() {
    const { data, error, isLoading, pagination, setPagination } =
        useDataTableCategory();

    const deleteCategoryMutation = useDeleteCategoryMutation();

    async function handleDelete(id: string) {
        await deleteCategoryMutation.mutateAsync(id);
    }

    const columnDefinition = getColumnDefinitionCategory({
        handleDelete,
    });
    return (
        <>
            {error && error instanceof Error ? (
                <AlertDanger>Error: {error.message}</AlertDanger>
            ) : isLoading ? (
                <p>Cargando data table...</p>
            ) : (
                <div className="w-full">
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
                </div>
            )}
        </>
    );
}
