import TableUsers from "@/components/data-table/table-user/TableUsers";
import Filters from "@/components/filter/Filters";
import ContainerUtil from "@/components/layout/ContainerUtil";
import { Title } from "@/components/layout/Title";

export default function UserPage() {
    return (
        <ContainerUtil>
            <Title>Usuarios</Title>
            <Filters />
            <TableUsers />
        </ContainerUtil>
    );
}
