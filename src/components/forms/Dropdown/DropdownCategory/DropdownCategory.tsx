import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IData } from "@/types/util";
import { classNames } from "@/libs/classNames";
import Dropdown from "../Dropdown";
import { getAllCategories } from "@/services/category.service";
import { IQuestionCategory } from "@/types/questionCategory";

interface Props {
    className?: string;
}

function convert(data: Array<IQuestionCategory>) {
    const op: Array<IData> = [];
    data.forEach((e) => {
        const o: IData = { label: e.name.toLocaleUpperCase(), value: e._id };
        op.push(o);
    });

    return op;
}

export const DropdownCategory = ({ className }: Props) => {
    //const queryClient = useQueryClient();
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });

    return (
        <div className={classNames("w-full", className ? className : "")}>
            <div className="text-start mb-1 w-full">
                <label>Categoría</label>
            </div>

            {error ? (
                <p>Hubo un herror</p>
            ) : isLoading || isFetching ? (
                <p>Cargando...</p>
            ) : data ? (
                <Dropdown options={convert(data.data)} />
            ) : null}
        </div>
    );
};
