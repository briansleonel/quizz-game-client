import { useEffect, useState } from "react";
import Button from "../button/ButtonPrimary";
import ModalDialog from "./ModalDialog";
import { IQuestionCategory } from "@/types/questionCategory";
import { optionsRecents, optionsVerified } from "@/libs/enums/filter.enum";
import { IData } from "@/types/util";
import { useAppDispatch, useAppSelector } from "@/store/hooks.redux";
import {
    changeQuestionFilterCategory,
    changeQuestionFilterRecent,
    changeQuestionFilterUser,
    changeQuestionFilterVerified,
    resetQuestionFilters,
} from "@/store/features/filters.question.slice";
import { Filter } from "react-bootstrap-icons";
import ListBoxCategory from "../forms/list-box/ListBoxCategory";
import ListBoxData from "../forms/list-box/ListBoxData";
import Label from "../forms/question/Label";
import { Role } from "@/libs/enums/role.enum";

const allCategories: IQuestionCategory = {
    _id: "all",
    name: "Todas las categorías",
};

const users: Array<IData> = [{ label: "Todos", value: "all" }];

export default function ModalQuestionFilters() {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);

    // Modal State
    const [isOpen, setIsOpen] = useState(false);

    // Filters state
    const [selectedCategory, setSelectedCategory] =
        useState<IQuestionCategory>(allCategories);
    const [selectedVerified, setSelectedVerified] = useState<IData>(
        optionsVerified[0]
    );
    const [selectedRecent, setSelectedRecent] = useState<IData>(
        optionsRecents[0]
    );

    const [selectedUser, setSelectedUser] = useState<IData>(users[0]);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    useEffect(() => {
        if (user.role === Role.ADMIN)
            users.push({ label: "Solo mías", value: user._id });
    }, [user]);

    /**
     * Permite resetear todos los filtros de búsqueda de preguntas
     */
    function resetFilters() {
        dispatch(resetQuestionFilters());
        setSelectedCategory(allCategories);
        setSelectedRecent(optionsRecents[0]);
        setSelectedVerified(optionsVerified[0]);
    }

    // Effect to Verified
    useEffect(() => {
        dispatch(
            changeQuestionFilterVerified({
                verified: selectedVerified.value,
            })
        );
    }, [selectedVerified, dispatch]);

    // Effect to Category
    useEffect(() => {
        dispatch(
            changeQuestionFilterCategory({
                category: selectedCategory._id,
            })
        );
    }, [selectedCategory, dispatch]);

    // Effect to Recent
    useEffect(() => {
        dispatch(
            changeQuestionFilterRecent({
                recents: selectedRecent.value === "true",
            })
        );
    }, [selectedRecent, dispatch]);

    useEffect(() => {
        dispatch(changeQuestionFilterUser({ user: selectedUser.value }));
    }, [dispatch, selectedUser]);

    return (
        <>
            <Button
                type="button"
                title="Filtros"
                onClick={openModal}
                className="flex items-center justify-center gap-2 text-sm !bg-white !text-black border drop-shadow hover:!bg-neutral-900 hover:!text-white hover:border-neutral-900"
            >
                <Filter className="w-4 h-4" /> <span>Filtrar</span>
            </Button>

            <ModalDialog
                closeModal={closeModal}
                isOpen={isOpen}
                title="Filtros"
                className="md:max-w-sm lg:max-w-md overflow-visible"
            >
                <div className="flex flex-col w-full gap-4">
                    <Label label="Categoría" name="category">
                        <ListBoxCategory
                            selected={selectedCategory}
                            setSelected={setSelectedCategory}
                            newOption={allCategories}
                        />
                    </Label>

                    <Label label="Mostrar" name="verified">
                        <ListBoxData
                            selected={selectedVerified}
                            setSelected={setSelectedVerified}
                            options={optionsVerified}
                        />
                    </Label>

                    <Label label="Ordenar por" name="recents">
                        <ListBoxData
                            selected={selectedRecent}
                            setSelected={setSelectedRecent}
                            options={optionsRecents}
                        />
                    </Label>

                    {user.role === Role.ADMIN && (
                        <Label label="Usuario" name="user">
                            <ListBoxData
                                selected={selectedUser}
                                setSelected={setSelectedUser}
                                options={users}
                            />
                        </Label>
                    )}

                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full mt-6">
                        <Button
                            className="text-sm w-full bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white"
                            onClick={() => resetFilters()}
                        >
                            Limpiar filtros
                        </Button>
                        <Button
                            className="text-sm w-full"
                            onClick={() => closeModal()}
                        >
                            Cerrar
                        </Button>
                    </div>
                </div>
            </ModalDialog>
        </>
    );
}
