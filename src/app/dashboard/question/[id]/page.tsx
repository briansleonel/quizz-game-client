"use client";

import AlertDanger from "@/components/alert/AlertDanger";
import QuestionForm from "@/components/forms/question/QuestionForm";
import { ContainerForm } from "@/components/layout/ContainerForm";
import questionService from "@/services/question.service";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { id: string } }) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["question", params.id],
        queryFn: () => questionService.getQuestion(params.id),
        enabled: params.id !== "new",
        cacheTime: 0,
    });

    const edit = params.id !== "new";

    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center  px-0 py-8 md:p-12 bg-stone-100">
            {!edit ? (
                <ContainerForm>
                    <QuestionForm edit={edit} />
                </ContainerForm>
            ) : error && error instanceof Error ? (
                <AlertDanger>Error: {error.message}</AlertDanger>
            ) : isLoading ? (
                <p>Cargando datos...</p>
            ) : data && edit ? (
                <ContainerForm>
                    <QuestionForm question={data.data} edit={edit} />
                </ContainerForm>
            ) : null}
        </div>
    );
}
