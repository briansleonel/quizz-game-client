import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryService from "@/services/category.service";
import { toastError, toastSuccess } from "@/libs/sonner/sonner.toast";
import { IQuestionCategory } from "@/types/questionCategory";

export function useUpdateCategoryMutation() {
    const queryClient = useQueryClient();

    const updateQuestionMutation = useMutation({
        mutationFn: categoryService.updateCategory,

        onSuccess: (data) => {
            toastSuccess(data.message as string);
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return updateQuestionMutation;
}

export function useDeleteCategoryMutation() {
    const queryClient = useQueryClient();

    const deleteQuestionMutation = useMutation({
        mutationFn: categoryService.deleteCategory,

        onSuccess: (data) => {
            toastSuccess(data.message as string);
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return deleteQuestionMutation;
}

export function useAddCategoryMutation() {
    const queryClient = useQueryClient();

    const addQuestionMutation = useMutation({
        mutationFn: categoryService.addCategory,

        onSuccess: (data) => {
            toastSuccess(data.message as string);
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return addQuestionMutation;
}

export function useCategory() {
    const updateCategory = useUpdateCategoryMutation();
    const deleteCategory = useDeleteCategoryMutation();
    const addCategory = useAddCategoryMutation();

    async function handlerUpdateCategory(category: IQuestionCategory) {
        await updateCategory.mutateAsync(category);
    }

    async function handlerDeleteCategory(id: string) {
        await deleteCategory.mutateAsync(id);
    }

    async function handlerAddCategory(category: IQuestionCategory) {
        await addCategory.mutateAsync(category);
    }

    return { handlerDeleteCategory, handlerUpdateCategory, handlerAddCategory };
}
