import { IData } from "@/types/util";
import { ListBox, ListBoxOption } from "./ListBox";

interface Props {
    selected: IData;
    setSelected: (item: IData) => void;
    options: Array<IData>;
}

const optionsRecents: Array<IData> = [
    { label: "Más recientes", value: "true" },
    { label: "Más antiguos", value: "false" },
];

export default function ListBoxData({ selected, setSelected, options }: Props) {
    return (
        <ListBox
            selected={selected}
            setSelected={setSelected}
            valueShow={selected ? selected.label : ""}
        >
            {options.map((item, i) => (
                <ListBoxOption key={i} value={item}>
                    {item.label}
                </ListBoxOption>
            ))}
        </ListBox>
    );
}
