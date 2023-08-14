import { IData } from "@/types/util";
import { useState } from "react";
import { MenuDropdown, MenuItem } from "./MenuDropdown";
import { optionsRecents } from "@/libs/enums/filter.enum";
import { Check } from "react-bootstrap-icons";

export default function MenuOrderRecents() {
    const [selected, setSelected] = useState<IData>();

    return (
        <MenuDropdown title="Ordenar por...">
            {optionsRecents.map((item, i) => (
                <MenuItem key={i} setSelected={() => setSelected(item)}>
                    {item.label}
                    {selected === item ? (
                        <Check className="h-5 w-5 text-emerald-500" />
                    ) : (
                        ""
                    )}
                </MenuItem>
            ))}
        </MenuDropdown>
    );
}
