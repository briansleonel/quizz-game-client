import Button from "@/components/button/ButtonPrimary";
import { RadioGroup } from "@headlessui/react";
import { PencilSquare, Trash3Fill } from "react-bootstrap-icons";

interface Props {
    correctOption: string;
    setCorrectOption: (opt: string) => void;
    options: Array<string>;
    handleEdit: (opt: string) => void;
    handleDelete: (opt: string) => void;
}

export default function OptionsButtonGroup({
    correctOption,
    options,
    setCorrectOption,
    handleDelete,
    handleEdit,
}: Props) {
    return (
        <RadioGroup value={correctOption} onChange={setCorrectOption}>
            <RadioGroup.Label className="sr-only">Options</RadioGroup.Label>
            <div className="space-y-2">
                {options.map((opt, index) => (
                    <RadioGroup.Option
                        key={index}
                        value={opt}
                        className={({ active, checked }) =>
                            `${active ? "" : ""} ${
                                checked
                                    ? "bg-emerald-500 text-white border focus:outline-none active:outline-none hover:opacity-95"
                                    : "bg-white border border-white hover:bg-emerald-50 hover:border hover:border-emerald-400"
                            } relative flex cursor-pointer rounded-md p-4 drop-shadow focus:outline-none outline-none transition-colors ease-in-out duration-500 `
                        }
                    >
                        {({ active, checked }) => (
                            <>
                                <div className="flex w-full items-center justify-between gap-2">
                                    <div className="text-sm">
                                        <RadioGroup.Label
                                            as="p"
                                            className={`font-medium w-full  ${
                                                checked
                                                    ? "text-white"
                                                    : "text-gray-900"
                                            }`}
                                        >
                                            {opt}
                                        </RadioGroup.Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            className="bg-yellow-500 hover:bg-yellow-400 text-sm"
                                            title="Editar"
                                            onClick={() => handleEdit(opt)}
                                        >
                                            <PencilSquare />
                                        </Button>
                                        <Button
                                            type="button"
                                            className="bg-red-600 hover:bg-red-500 text-sm"
                                            title="Eliminar"
                                            onClick={() => handleDelete(opt)}
                                        >
                                            <Trash3Fill />
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
}
