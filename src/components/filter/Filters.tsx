"use client";

import { Search } from "react-bootstrap-icons";
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
import { useEffect, useState } from "react";
import ListBoxData from "../forms/list-box/ListBoxData";
import { optionsVerified } from "@/libs/enums/filter.enum";

export default function Filters() {
    const dispatch = useAppDispatch();

    const searchInput = useFormInput("");

    const [selectedVerified, setSelectedVerified] = useState<IData>(
        optionsVerified[0]
    );

    const searchHandle = () => {
        dispatch(
            changeSearchText({
                searchText: searchInput.inputProps.value,
            })
        );
    };

    const resetSearchInput = () => {
        searchInput.resetInput();
        dispatch(
            changeSearchText({
                searchText: "",
            })
        );
    };

    // Effect to Verified
    useEffect(() => {
        dispatch(
            changeFilterVerified({
                verified: selectedVerified.value as Verified,
            })
        );
    }, [selectedVerified, dispatch]);

    return (
        <section className="grid grid-cols-2 md:grid-cols-7 lg:grid-cols-9 items-center w-full gap-2">
            <SearchInput
                type="text"
                name="searchInput"
                placeholder="Nombre completo o nombre de usuario..."
                inputProps={searchInput.inputProps}
                className="col-span-2 md:col-span-5 lg:col-span-5"
                onClick={() => resetSearchInput()}
            />
            <Button
                onClick={() => searchHandle()}
                className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center col-span-2 md:col-span-2 lg:col-span-1 py-2 text-sm shadow"
            >
                <span>Buscar</span>
                <Search className="ml-3" />
            </Button>

            <div className="flex items-center flex-col gap-0 col-span-2 md:flex-row md:gap-2 md:col-span-7 lg:col-span-3">
                <label
                    htmlFor="verified"
                    className="w-full whitespace-pre text-base text-start md:text-end md:mb-0"
                >
                    Mostrar
                </label>
                <ListBoxData
                    selected={selectedVerified}
                    setSelected={setSelectedVerified}
                    options={optionsVerified}
                />
            </div>
        </section>
    );
}
