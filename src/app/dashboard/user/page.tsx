import TableUsers from "@/components/data-table/table-user/TableUsers";
import Filters from "@/components/filter/Filters";
import { Title } from "@/components/layout/Title";

export default function UserPage() {
    return (
        <div className="w-full flex flex-col items-center gap-8 py-10 px-4 md:px-8 md:py-12">
            <Title>Usuarios</Title>
            <Filters />
            <TableUsers />
        </div>
    );
}
