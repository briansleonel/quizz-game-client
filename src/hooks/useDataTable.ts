import categoryService from "@/services/category.service";
import questionService from "@/services/question.service";
import { QueryFetch } from "@/services/user.service";
import { useAppSelector } from "@/store/hooks.redux";
import { APIResponse, ApiPagination } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props<T> {
    functionFetch: (query: QueryFetch) => Promise<APIResponse<T[]>>;
    queryKey: string;
}

export default function useDataTable<T>({ functionFetch, queryKey }: Props<T>) {
    // datos de paginación recibidos por la api
    const [pagination, setPagination] = useState<ApiPagination>();

    const filters = useAppSelector((state) => state.fitlers);

    // react-query para la obtención de datos desde la api
    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: [queryKey, pagination, filters],
        queryFn: () =>
            functionFetch({
                limit: pagination?.limit || 10,
                page: pagination?.page || 1,
                verified: filters.verified,
                searchText: filters.searchText,
            }),
        keepPreviousData: true,
    });

    /**
     * Hook para controlar el momento en el que se reciben los datos y establecer los datos de paginación
     */
    useEffect(() => {
        if (data) {
            setPagination(data.pagination);
        }
    }, [data]);

    return { pagination, setPagination, data, isLoading, error, isFetching };
}

export function useDataTableQuestion() {
    // datos de paginación recibidos por la api
    const [pagination, setPagination] = useState<ApiPagination>();

    const filtersQuestion = useAppSelector((state) => state.questionFilters);

    // react-query para la obtención de datos desde la api
    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ["questions", pagination, filtersQuestion],
        queryFn: () =>
            questionService.getQuestions({
                limit: pagination?.limit || 10,
                page: pagination?.page || 1,
                verified: filtersQuestion.verified,
                searchText: filtersQuestion.searchText,
                category: filtersQuestion.category,
                recents: filtersQuestion.recents,
                user: filtersQuestion.user,
            }),
        keepPreviousData: true,
    });

    /**
     * Hook para controlar el momento en el que se reciben los datos y establecer los datos de paginación
     */
    useEffect(() => {
        if (data) {
            setPagination(data.pagination);
        }
    }, [data]);

    return { pagination, setPagination, data, isLoading, error, isFetching };
}

export function useDataTableCategory() {
    // datos de paginación recibidos por la api
    const [pagination, setPagination] = useState<ApiPagination>();

    // react-query para la obtención de datos desde la api
    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ["categories", pagination],
        queryFn: () =>
            categoryService.getAllCategoriesPagination({
                limit: pagination?.limit || 10,
                page: pagination?.page || 1,
            }),
        keepPreviousData: true,
    });

    /**
     * Hook para controlar el momento en el que se reciben los datos y establecer los datos de paginación
     */
    useEffect(() => {
        if (data) {
            setPagination(data.pagination);
        }
    }, [data]);

    return { pagination, setPagination, data, isLoading, error, isFetching };
}
