"use client";

import { Plus, Search } from "react-bootstrap-icons";
import Button from "../button/ButtonPrimary";
import { SearchInput } from "../forms/input/SearchInput";
import { useFormInput } from "@/hooks/useFormInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks.redux";
import { changeQuestionSearchText } from "@/store/features/filters.question.slice";
import ModalQuestionFilters from "../modal/ModalQuestionFilters";
import { useNavigationRouter } from "@/hooks/useNavigationRouter";

export default function FiltersQuestion() {
    const dispatch = useAppDispatch();
    const filtersQuestion = useAppSelector((state) => state.questionFilters);

    const router = useNavigationRouter();

    // Search input
    const searchInput = useFormInput(filtersQuestion.searchText);

    const handlerSearch = () => {
        dispatch(
            changeQuestionSearchText({
                searchText: searchInput.inputProps.value,
            })
        );
    };

    const resetSearchInput = () => {
        searchInput.resetInput();
        dispatch(changeQuestionSearchText({ searchText: "" }));
    };

    const addNewQuestion = () => {
        router.goTo("/dashboard/question/new");
    };

    return (
        <section className="grid grid-cols-2 md:grid-cols-7 lg:grid-cols-9 items-center w-full gap-2">
            <SearchInput
                inputProps={searchInput.inputProps}
                name="search"
                onClick={() => resetSearchInput()}
                type="text"
                className="col-span-2 md:col-span-4 lg:col-span-6"
            />
            <Button
                onClick={() => handlerSearch()}
                className="flex items-center justify-center gap-2 text-sm drop-shadow col-span-2 md:col-span-1"
            >
                <Search className="w-3 h-3" />
                <span>Buscar</span>
            </Button>
            <ModalQuestionFilters />
            <Button
                className="flex items-center justify-center gap-2 text-sm bg-emerald-500 hover:bg-emerald-600"
                onClick={() => addNewQuestion()}
                title="Agregar nueba pregunta"
            >
                <Plus className="w-5 h-5" /> <span>Nuevo</span>
            </Button>
        </section>
    );
}
