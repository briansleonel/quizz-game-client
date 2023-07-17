import { APIResponse, ApiPagination, PaginationFetch } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props<T> {
    functionFetch: (
        paginationFetch: PaginationFetch
    ) => Promise<APIResponse<T[]>>;
    queryKey: string;
}

export default function useDataTable<T>({ functionFetch, queryKey }: Props<T>) {
    // datos de paginación recibidos por la api
    const [pagination, setPagination] = useState<ApiPagination>();

    // react-query para la obtención de datos desde la api
    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: [queryKey, pagination],
        queryFn: () =>
            functionFetch({
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
