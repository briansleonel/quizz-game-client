"use client";
import QuestionFormUpgrade from "@/components/forms/question/QuestionFrm";
import questionService from "@/services/question.service";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { id: string } }) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["question", params.id],
        queryFn: () => questionService.getQuestion(params.id),
    });

    return params.id === "new" ? (
        ""
    ) : error && error instanceof Error ? (
        <p>Error: {error.message}</p>
    ) : isLoading ? (
        <p>Cargando datos...</p>
    ) : data ? (
        <QuestionFormUpgrade question={data.data} />
    ) : null;
}
