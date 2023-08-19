"use client";

import AlertDanger from "@/components/alert/AlertDanger";
import { useDataTableQuestion } from "@/hooks/useDataTable";
import TableGeneric from "../TableGeneric";
import Pagination from "../Pagination";
import { getColumnDefinitionQuestion } from "./getColumnDef";
import {
    useChangeVerificationQuestion,
    useDeleteQuestionMutation,
} from "@/hooks/useQuestion";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks.redux";
import { useEffect } from "react";
import { changeQuestionFilterUser } from "@/store/features/filters.question.slice";

export default function TableQuestions() {
    const router = useRouter();

    const { data, error, isLoading, pagination, setPagination } =
        useDataTableQuestion();

    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    // establezco el filtro para mostrar las preguntas solo del usuario autenticado
    useEffect(() => {
        dispatch(changeQuestionFilterUser({ user: user._id }));
    }, [dispatch, user]);

    const deleteQuestionMutation = useDeleteQuestionMutation();
    const changeVerifiedMutation = useChangeVerificationQuestion();

    const handleDelete = async (userId: string) => {
        await deleteQuestionMutation.mutateAsync(userId);
    };

    const handleChangeVerification = async (userId: string) => {
        await changeVerifiedMutation.mutateAsync(userId);
    };

    const handleEdit = (userId: string) => {
        router.push(`/dashboard/question/${userId}`);
    };

    const columnDefinition = getColumnDefinitionQuestion({
        handleDelete,
        handleChangeVerification,
        handleEdit,
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
