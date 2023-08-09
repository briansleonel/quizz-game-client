import Button from "@/components/button/ButtonPrimary";
import { InputText } from "../input/Input";
import { FormEvent } from "react";

interface Props {
    inputProps: {
        value: string;
        onChange: (e: FormEvent<HTMLInputElement>) => void;
    };
    editOption: boolean;
    handleAdd: () => void;
    handleCancelEdit: () => void;
}

export default function InputOption({
    editOption,
    handleAdd,
    handleCancelEdit,
    inputProps,
}: Props) {
    return (
        <div className="flex flex-col gap-2">
            <InputText type="text" name="option" inputProps={inputProps} />
            <div className="w-full flex  gap-1 md:gap-2">
                <Button
                    type="button"
                    className="text-sm font-extralight transition-all w-full p-1 bg-indigo-600 hover:bg-indigo-600/90"
                    onClick={() => handleAdd()}
                >
                    Agregar opción
                </Button>
                {editOption && (
                    <Button
                        type="button"
                        className="text-sm font-extralight bg-red-600 hover:bg-red-500 w-full p-1"
                        onClick={() => handleCancelEdit()}
                    >
                        Cancelar
                    </Button>
                )}
            </div>
        </div>
    );
}
