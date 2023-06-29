import { IData } from "@/types/util";
import { classNames } from "@/libs/classNames";
import Dropdown from "../Dropdown";

const options: Array<IData> = [
    { label: "Ciencia", value: "1" },
    { label: "Historia", value: "2" },
    { label: "Entretenimiento", value: "3" },
];

interface Props {
    className?: string;
}

export const DropdownCategory = ({ className }: Props) => {
    return (
        <div className={classNames("w-full", className ? className : "")}>
            <div className="text-start mb-1 w-full">
                <label>Categoría</label>
            </div>

            <Dropdown options={options} />
        </div>
    );
};
