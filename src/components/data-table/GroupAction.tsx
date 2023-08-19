import {
    HandThumbsDown,
    HandThumbsUp,
    PencilSquare,
    Trash3Fill,
} from "react-bootstrap-icons";
import Button from "../button/ButtonPrimary";
import { useAppSelector } from "@/store/hooks.redux";
import { Role } from "@/libs/enums/role.enum";

interface Props {
    verified: boolean;
    id: string;
    handleDelete: (id: string) => void;
    handleChangeVerification: (id: string) => void;
    handleEdit: (id: string) => void;
}

export default function GroupButtonActions({
    id,
    verified,
    handleChangeVerification,
    handleDelete,
    handleEdit,
}: Props) {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <div className="flex gap-2 justify-center">
            <Button
                className="bg-yellow-500 hover:bg-yellow-400"
                title="Editar"
                onClick={() => handleEdit(id)}
            >
                <PencilSquare />
            </Button>
            <Button
                className="bg-red-600 hover:bg-red-500"
                title="Eliminar"
                onClick={() => handleDelete(id)}
            >
                <Trash3Fill />
            </Button>
            {user.role === Role.ADMIN && (
                <Button
                    className="bg-sky-600 hover:bg-sky-500"
                    title="Cambiar verificación"
                    onClick={() => handleChangeVerification(id)}
                >
                    {verified ? <HandThumbsDown /> : <HandThumbsUp />}
                </Button>
            )}
        </div>
    );
}
