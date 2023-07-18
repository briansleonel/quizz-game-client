import TableUsers from "@/components/data-table/TableUsers";
import { Title } from "@/components/layout/Title";

export default function UserPage() {
    return (
        <div className="w-full flex flex-col items-center gap-4 md:gap-6 py-8 px-4 md:p-8">
            <Title>Usuarios</Title>
            <TableUsers />
        </div>
    );
}
