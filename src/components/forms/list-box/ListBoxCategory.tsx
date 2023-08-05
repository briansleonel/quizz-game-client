import { IQuestionCategory } from "@/types/questionCategory";
import { ListBox, ListBoxOption } from "./ListBox";
import categoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import AlertDanger from "@/components/alert/AlertDanger";

interface Props {
    selected: IQuestionCategory | undefined;
    setSelected: (category: IQuestionCategory) => void;
}

export default function ListBoxCategory({ selected, setSelected }: Props) {
    // Cargo las categorías
    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: categoryService.getAllCategories,
    });

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
            {data && (
                <ListBox
                    selected={selected}
                    setSelected={setSelected}
                    valueShow={selected?.name ? selected.name : ""}
                    options={data}
                >
                    {data.map((category, index) => (
                        <ListBoxOption key={index} value={category}>
                            {category.name}
                        </ListBoxOption>
                    ))}
                </ListBox>
            )}
        </>
    );
}
