"use client";

import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "react-bootstrap-icons";
import TableGeneric from "./TableGeneric";

import userService from "@/services/user.service";
import Pagination from "./Pagination";
import AlertDanger from "../alert/AlertDanger";
import useDataTable from "@/hooks/useDataTable";

//import "rsuite/dist/rsuite.min.css";

const columnDefinition: Array<ColumnDef<IUser>> = [
    {
        accessorFn: (row) => `${row.lastName}, ${row.firstName}`,
        accessorKey: "fullName",
        header: "Nombre completo",
    },
    {
        accessorFn: (row) => row.username,
        accessorKey: "username",
        header: "Nombre de usuario",
    },

    {
        accessorFn: (row) => row.email,
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorFn: (row) => row.role,
        accessorKey: "role",
        header: "Rol",
    },
    {
        cell: (row) => (
            <span className="w-full h-full flex justify-center">
                {row.getValue() ? (
                    <Check className="text-green-500 w-6 h-6" />
                ) : (
                    <X className="text-red-500 w-6 h-6" />
                )}
            </span>
        ),
        accessorKey: "verified",
        header: "Verificado",
    },
];

export default function TableUsers() {
    const { data, error, isLoading, pagination, setPagination, isFetching } =
        useDataTable({
            functionFetch: userService.getUsers,
            queryKey: "users",
        });
    /*
    // datos de paginación recibidos por la api
    const [pagination, setPagination] = useState<ApiPagination>();

    // react-query para la obtención de datos desde la api
    const { data, isLoading, error } = useQuery({
        queryKey: ["users", pagination],
        queryFn: () =>
            userService.getUsers({
                limit: pagination?.limit || 10,
                page: pagination?.page || 1,
            }),
        keepPreviousData: true,
    });

    useEffect(() => {
        if (data) {
            setPagination(data.pagination);
        }
    }, [data]);
    */

    return (
        <>
            {error && error instanceof Error ? (
                <AlertDanger>Error: {error.message}</AlertDanger>
            ) : isLoading ? (
                <p>Cargando...</p>
            ) : (
                <div className="w-full">
                    {isFetching ? <div>Refreshing...</div> : null}
                    {data ? (
                        <TableGeneric
                            columnsDef={columnDefinition}
                            data={data.data}
                        />
                    ) : null}

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
