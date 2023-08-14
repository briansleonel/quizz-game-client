import { IQuestionCategory } from "@/types/questionCategory";
import { ListBox, ListBoxOption } from "./ListBox";
import categoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import AlertDanger from "@/components/alert/AlertDanger";
import { useEffect, useState } from "react";

interface Props {
    selected: IQuestionCategory | undefined;
    setSelected: (category: IQuestionCategory) => void;
    newOption?: IQuestionCategory;
}

export default function ListBoxCategory({
    selected,
    setSelected,
    newOption,
}: Props) {
    // Cargo las categorías
    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: categoryService.getAllCategories,
    });

    const [options, setOptions] = useState<Array<IQuestionCategory>>([]);

    useEffect(() => {
        if (data && options.length <= 0) {
            if (newOption) setOptions(addNewOption(newOption, data));
            else setOptions(data);
        }
    }, [data, newOption, options.length]);

    const addNewOption = (
        addOption: IQuestionCategory,
        data: Array<IQuestionCategory>
    ) => {
        data.unshift(addOption);
        return data;
    };

    const mapOptions = (data: Array<IQuestionCategory>) => {
        return data.map((category, index) => (
            <ListBoxOption key={index} value={category}>
                {category.name}
            </ListBoxOption>
        ));
    };

    if (error && error instanceof Error) {
        return (
            <>
                <AlertDanger>{error.message}</AlertDanger>
            </>
        );
    }

    if (isLoading) {
        return <>Cargando categorías</>;
    }

    return (
        <>
            {data && options && (
                <ListBox
                    selected={selected}
                    setSelected={setSelected}
                    valueShow={selected?.name ? selected.name : ""}
                >
                    {mapOptions(options)}
                    {/*data.map((category, index) => (
                        <ListBoxOption key={index} value={category}>
                            {category.name}
                        </ListBoxOption>
                    ))*/}
                </ListBox>
            )}
        </>
    );
}
