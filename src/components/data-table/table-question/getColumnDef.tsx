import Button from "@/components/button/ButtonPrimary";
import ModalShowQuestion from "@/components/modal/ModalShowQuestion";
import { IQuestion } from "@/types/question";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Eye, X } from "react-bootstrap-icons";
import GroupButtonActions from "../GroupAction";

export function getColumnDefinitionQuestion({
    handleChangeVerification,
    handleDelete,
}: {
    handleDelete: (id: string) => void;
    handleChangeVerification: (id: string) => void;
}): Array<ColumnDef<IQuestion>> {
    return [
        {
            cell: (row) => <ModalShowQuestion question={row.row.original} />,
            accessorKey: "show",
            header: "",
        },
        {
            accessorFn: (row) => row.question,
            accessorKey: "question",
            header: "Pregunta",
        },
        {
            accessorFn: (row) => row.category.name.toUpperCase(),
            accessorKey: "category",
            header: "Categoría",
        },
        /*
        {
            accessorFn: (row) => row.options,
            accessorKey: "options",
            header: "Opciones",
        },
        */
        {
            cell: (row) => (
                <span className="w-full h-full flex justify-center">
                    {row.getValue() ? (
                        <Check className="text-green-500 w-6 h-6" />
                    ) : (
                        <X className="text-red-500 w-6 h-6" />
                    )}
                </span>
            ),
            accessorKey: "verified",
            header: "Verificado",
        },

        {
            cell: (row) => {
                const verified = row.row.original.verified;
                const id = row.row.original._id;

                return (
                    <GroupButtonActions
                        handleChangeVerification={() =>
                            handleChangeVerification(id)
                        }
                        handleDelete={() => handleDelete(id)}
                        id={id}
                        verified={verified}
                    />
                );
            },
            accessorKey: "actions",
            header: "Acciones",
        },
    ];
}
