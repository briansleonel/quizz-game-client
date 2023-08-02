"use client";

import AlertDanger from "@/components/alert/AlertDanger";
import useDataTable from "@/hooks/useDataTable";
import questionService from "@/services/question.service";
import TableGeneric from "../TableGeneric";
import Pagination from "../Pagination";
import { getColumnDefinitionQuestion } from "./getColumnDef";
import {
    useChangeVerificationQuestion,
    useDeleteQuestionMutation,
} from "@/hooks/useQuestion";

export default function TableQuestions() {
    const { data, error, isLoading, pagination, setPagination } = useDataTable({
        functionFetch: questionService.getQuestions,
        queryKey: "questions",
    });

    const deleteQuestionMutation = useDeleteQuestionMutation();
    const changeVerifiedMutation = useChangeVerificationQuestion();

    const handleDelete = async (userId: string) => {
        await deleteQuestionMutation.mutateAsync(userId);
    };

    const handleChangeVerification = async (userId: string) => {
        await changeVerifiedMutation.mutateAsync(userId);
    };

    const columnDefinition = getColumnDefinitionQuestion({
        handleDelete,
        handleChangeVerification,
    });

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
