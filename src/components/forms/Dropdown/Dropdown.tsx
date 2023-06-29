import { IData } from "@/types/util";
import { useController, useFormContext } from "react-hook-form";
import Select, { StylesConfig } from "react-select";

interface Props {
    options: Array<IData>;
}

const stylesSelect: StylesConfig = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.menuIsOpen ? "#2563eb" : "##9ca3af",
        backgroundColor: "#fafaf9",
        border: "1px solid #9ca3af",
        outline: "none",
        borderRadius: "0.375rem",
        boxShadow: "",
        ":hover": { borderColor: "#2563eb" },
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: "#fafaf9",
        padding: "0",
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        ":hover": {
            backgroundColor: state.isSelected ? "#111827" : "#e7e5e4",
        },
        backgroundColor: state.isSelected ? "#111827" : "",
        color: state.isSelected ? "#fff" : "#000",
    }),
};

export default function Dropdown({ options }: Props) {
    const { control } = useFormContext();
    const { field } = useController({
        name: "category",
        control,
        rules: { required: true },
    });
    const {
        value: categoryValue,
        onChange: selectChange,
        ...restSelectField
    } = field;

    return (
        <Select
            value={
                categoryValue
                    ? options.find((x) => x.value === categoryValue)
                    : categoryValue
            }
            onChange={(option) => selectChange(option ? option.value : option)}
            options={options}
            styles={stylesSelect}
            isClearable
            {...restSelectField}
        />
    );
}
