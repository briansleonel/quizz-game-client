import TableUsers from "@/components/data-table/TableUsers";

export default function UserPage() {
    return (
        <div className="w-full flex flex-col items-center">
            <h2>Usuarios</h2>
            <TableUsers />
        </div>
    );
}
