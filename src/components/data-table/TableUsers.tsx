"use client";

import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "react-bootstrap-icons";
import TableGeneric from "./TableGeneric";

import userService from "@/services/user.service";
import Pagination from "./Pagination";
import AlertDanger from "../alert/AlertDanger";
import useDataTable from "@/hooks/useDataTable";
import { IData } from "@/types/util";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks.redux";
import {
    Verified,
    changeFilterVerified,
    changeSearchText,
} from "@/store/features/filters.slice";
import { useFormInput } from "@/hooks/useFormInput";
import { InputText } from "../forms/input/Input";

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

const optionsVerified: Array<IData> = [
    { label: "Todos", value: Verified.ALL },
    { label: "Verificados", value: Verified.VERIFIED },
    { label: "No verificados", value: Verified.NOVERIFIED },
];

export default function TableUsers() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.fitlers);

    const [verified, setVerified] = useState<string>("");
    const searchInput = useFormInput("");

    const { data, error, isLoading, pagination, setPagination, isFetching } =
        useDataTable({
            functionFetch: userService.getUsers,
            queryKey: "users",
            verified,
        });

    const searchHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(
            changeSearchText({
                ...filters,
                searchText: searchInput.inputProps.value,
            })
        );
    };

    const changeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(
            changeFilterVerified({
                ...filters,
                verified: e.currentTarget.value as Verified,
            })
        );
    };

    return (
        <>
            {error && error instanceof Error ? (
                <AlertDanger>Error: {error.message}</AlertDanger>
            ) : isLoading ? (
                <p>Cargando data table...</p>
            ) : (
                <div className="w-full">
                    {/*isFetching ? <div>Refreshing...</div> : null*/}
                    <div>
                        <InputText
                            type="text"
                            name="searchInput"
                            inputProps={searchInput.inputProps}
                        />
                        <button onClick={(e) => searchHandle(e)}>Buscar</button>
                        <label htmlFor="verified">Mostrar </label>
                        <select
                            name="verified"
                            id="verified"
                            onChange={(e) => changeSelect(e)}
                        >
                            {optionsVerified.map((e) => (
                                <option key={e.label} value={e.value}>
                                    {e.label}
                                </option>
                            ))}
                        </select>
                        <button>Agregar</button>
                    </div>
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