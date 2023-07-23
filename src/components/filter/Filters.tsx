"use client";

import { Filter, Search } from "react-bootstrap-icons";
import Button from "../button/ButtonPrimary";
import { SearchInput } from "../forms/input/SearchInput";
import {
    Verified,
    changeFilterVerified,
    changeSearchText,
} from "@/store/features/filters.slice";
import { IData } from "@/types/util";
import { useAppDispatch, useAppSelector } from "@/store/hooks.redux";
import { useFormInput } from "@/hooks/useFormInput";
import { ChangeEvent, useState } from "react";

const optionsVerified: Array<IData> = [
    { label: "Todos", value: Verified.ALL },
    { label: "Verificados", value: Verified.VERIFIED },
    { label: "No verificados", value: Verified.NOVERIFIED },
];

export default function Filters() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.fitlers);
    const searchInput = useFormInput("");

    const [expanded, setExpanded] = useState(false);

    const [showMobile, setShowMobile] = useState(false);

    const searchHandle = () => {
        dispatch(
            changeSearchText({
                ...filters,
                searchText: searchInput.inputProps.value,
            })
        );
    };

    const resetSearchInput = () => {
        searchInput.resetInput();
        dispatch(
            changeSearchText({
                ...filters,
                searchText: "",
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
        <section className="w-full">
            <button
                className="w-full p-2 rounded select-none bg-zinc-900 text-white flex justify-between items-center font-light text-xs uppercase md:hidden"
                onClick={() => setShowMobile(!showMobile)}
            >
                <span>Filtros</span> <Filter className="" />
            </button>
            <div
                className={`w-full bg-neutral-100 rounded overflow-hidden transition-[max-height] duration-500 ease-in drop-shadow md:max-h-fit ${
                    showMobile ? "max-h-80" : "max-h-0"
                }`}
            >
                <div className="grid p-4 md:p-8 grid-cols-1 md:grid-cols-8 gap-2 md:gap-4 items-end md:items-center">
                    <SearchInput
                        type="text"
                        name="searchInput"
                        placeholder="Nombre completo o nombre de usuario..."
                        inputProps={searchInput.inputProps}
                        className="col-span-1 md:col-span-6 lg:col-span-5"
                        onClick={() => resetSearchInput()}
                    />
                    <Button
                        onClick={() => searchHandle()}
                        className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-1 py-1.5"
                    >
                        <span>Buscar</span>
                        <Search className="ml-3" />
                    </Button>

                    <label
                        htmlFor="verified"
                        className="w-auto md:w-full whitespace-pre text-base col-span-1 md:text-end -mb-2 md:mb-0"
                    >
                        Mostrar:
                    </label>
                    <select
                        name="verified"
                        id="verified"
                        onChange={(e) => changeSelect(e)}
                        className="w-full px-2 md:px-3 py-2 border rounded text-gray-950 border-gray-400 bg-zinc-50 focus:outline-none text-sm uppercase drop-shadow col-span-1 md:col-span-2 lg:col-span-1"
                    >
                        {optionsVerified.map((e) => (
                            <option
                                key={e.label}
                                value={e.value}
                                className="py-2 hover:bg-neutral-400 checked:!bg-neutral-400"
                            >
                                {e.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    );
}
