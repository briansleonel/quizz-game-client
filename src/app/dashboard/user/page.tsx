import Button from "@/components/button/ButtonPrimary";
import TableUsers from "@/components/data-table/TableUsers";
import Filters from "@/components/filter/Filters";
import { Title } from "@/components/layout/Title";
import { PersonPlusFill, Plus, PlusLg } from "react-bootstrap-icons";

export default function UserPage() {
    return (
        <div className="w-full flex flex-col items-center gap-4 md:gap-6 py-8 px-4 md:p-8">
            <Title>Usuarios</Title>
            <Button className="bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-sm py-1 px-3">
                <span>Agregar</span>
                <Plus className="ml-1 text-2xl font-extrabold" />
            </Button>
            <Filters />
            <TableUsers />
        </div>
    );
}
