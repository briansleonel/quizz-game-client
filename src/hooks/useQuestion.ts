import { toastError, toastSuccess } from "@/libs/toast";
import questionService from "@/services/question.service";
import { IQuestion, IQuestionId } from "@/types/question";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigationRouter } from "./useNavigationRouter";

const PATH_NAVIGATION = "/dashboard/question/";

export function useDeleteQuestionMutation() {
    const queryClient = useQueryClient();

    const deleteQuestionMutation = useMutation({
        mutationFn: questionService.deleteQuestion,
        onSuccess: (data) => {
            toastSuccess(data.message);
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return deleteQuestionMutation;
}

export function useChangeVerificationQuestion() {
    const queryClient = useQueryClient();

    const changeVerifiedQuestionMutation = useMutation({
        mutationFn: questionService.changeVerification,
        onSuccess: (data) => {
            toastSuccess(data.message);
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return changeVerifiedQuestionMutation;
}

export function useUpdateQuestionMutation() {
    const router = useNavigationRouter();

    const updateQuestionMutation = useMutation({
        mutationFn: questionService.updateQuestion,

        onSuccess: (data) => {
            router.goTo(PATH_NAVIGATION);
            toastSuccess(data.message as string);
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return updateQuestionMutation;
}

export function useAddQuestionMutation() {
    const router = useNavigationRouter();

    const addQuestionMutation = useMutation({
        mutationFn: questionService.addQuestion,

        onSuccess: (data) => {
            router.goTo(PATH_NAVIGATION);
            toastSuccess(data.message as string);
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return addQuestionMutation;
}

export function useQuestion() {
    // Mutations
    const updateMutation = useUpdateQuestionMutation();
    const addMutation = useAddQuestionMutation();

    async function handlerUpdateQuestion(questionUpdate: IQuestionId) {
        await updateMutation.mutateAsync(questionUpdate);
    }

    async function handlerAddQuestion(question: IQuestion) {
        await addMutation.mutateAsync(question);
    }

    return { handlerAddQuestion, handlerUpdateQuestion };
}
