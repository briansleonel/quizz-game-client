import { ColumnDef } from "@tanstack/react-table";
import { Trash3Fill } from "react-bootstrap-icons";
import { IQuestionCategory } from "@/types/questionCategory";
import Button from "@/components/button/ButtonPrimary";
import ModalCategory from "@/components/modal/ModalCategory";

export function getColumnDefinitionCategory({
    handleDelete,
    isAdmin,
}: {
    handleDelete: (id: string) => void;
    isAdmin: boolean;
}): Array<ColumnDef<IQuestionCategory>> {
    const columnDefinition: Array<ColumnDef<IQuestionCategory>> = [
        {
            accessorFn: (row) => row.name.toUpperCase(),
            accessorKey: "name",
            header: "Nombre de categoría",
        },
    ];

    const actionsColumn: ColumnDef<IQuestionCategory> = {
        cell: (row) => {
            const id = row.row.original._id;

            return (
                <div className="flex gap-2 justify-center">
                    <ModalCategory category={row.row.original} edit={true} />
                    <Button
                        className="bg-red-600 hover:bg-red-500"
                        title="Eliminar"
                        onClick={() => handleDelete(id)}
                    >
                        <Trash3Fill />
                    </Button>
                </div>
            );
        },
        accessorKey: "actions",
        header: "Acciones",
    };

    if (isAdmin) columnDefinition.push(actionsColumn);

    return columnDefinition;
}
