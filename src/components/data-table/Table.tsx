import { ColumnDef } from "@tanstack/react-table";
import TableGeneric from "./TableGeneric";
import { Check, CircleFill, X } from "react-bootstrap-icons/";

const nData = [
    {
        firstName: "Zelig",
        lastName: "Brownjohn",
        email: "zbrownjohn0@un.org",
        verified: false,
        active: true,
        _id: "64af6506fc13ae38b5beec56",
    },
    {
        firstName: "Ciro",
        lastName: "Quincey",
        email: "cquincey1@gov.uk",
        verified: false,
        active: false,
        _id: "64af6506fc13ae38b5beec57",
    },
    {
        firstName: "Humfrid",
        lastName: "Franks",
        email: "hfranks2@devhub.com",
        verified: false,
        active: false,
        _id: "64af6506fc13ae38b5beec58",
    },
    {
        firstName: "Kenneth",
        lastName: "Benka",
        email: "kbenka3@oracle.com",
        verified: true,
        active: false,
        _id: "64af6506fc13ae38b5beec59",
    },
    {
        firstName: "Thomas",
        lastName: "Emmott",
        email: "temmott4@uiuc.edu",
        verified: true,
        active: true,
        _id: "64af6506fc13ae38b5beec5a",
    },
    {
        firstName: "Blake",
        lastName: "Carpenter",
        email: "bcarpenter5@ebay.co.uk",
        verified: true,
        active: true,
        _id: "64af6506fc13ae38b5beec5b",
    },
    {
        firstName: "Anna-maria",
        lastName: "Gianulli",
        email: "agianulli6@unblog.fr",
        verified: true,
        active: true,
        _id: "64af6506fc13ae38b5beec5c",
    },
    {
        firstName: "Happy",
        lastName: "Sillwood",
        email: "hsillwood7@arstechnica.com",
        verified: false,
        active: true,
        _id: "64af6506fc13ae38b5beec5d",
    },
    {
        firstName: "Ulrike",
        lastName: "O'Lunny",
        email: "uolunny8@hubpages.com",
        verified: true,
        active: true,
        _id: "64af6506fc13ae38b5beec5e",
    },
    {
        firstName: "Neale",
        lastName: "Trowle",
        email: "ntrowle9@cnet.com",
        verified: true,
        active: true,
        _id: "64af6506fc13ae38b5beec5f",
    },
    {
        firstName: "Jaquith",
        lastName: "Baudain",
        email: "jbaudaina@dmoz.org",
        verified: false,
        active: true,
        _id: "64af6506fc13ae38b5beec60",
    },
    {
        firstName: "Jordon",
        lastName: "De Metz",
        email: "jdemetzb@constantcontact.com",
        verified: true,
        active: true,
        _id: "64af6506fc13ae38b5beec61",
    },
    {
        firstName: "Sollie",
        lastName: "Tanzer",
        email: "stanzerc@sina.com.cn",
        verified: true,
        active: true,
        _id: "64af6506fc13ae38b5beec62",
    },
    {
        firstName: "Christina",
        lastName: "D'Ambrosio",
        email: "cdambrosiod@sohu.com",
        verified: false,
        active: true,
        _id: "64af6506fc13ae38b5beec63",
    },
    {
        firstName: "Gannie",
        lastName: "Knellen",
        email: "gknellene@java.com",
        verified: false,
        active: true,
        _id: "64af6506fc13ae38b5beec64",
    },
    {
        firstName: "Hal",
        lastName: "Askam",
        email: "haskamf@vimeo.com",
        verified: true,
        active: true,
        _id: "64af6506fc13ae38b5beec65",
    },
    {
        firstName: "Putnem",
        lastName: "Tremblay",
        email: "ptremblayg@slashdot.org",
        verified: false,
        active: true,
        _id: "64af6506fc13ae38b5beec66",
    },
    {
        firstName: "Jenni",
        lastName: "Franchyonok",
        email: "jfranchyonokh@narod.ru",
        verified: true,
        active: true,
        _id: "64af6506fc13ae38b5beec67",
    },
    {
        firstName: "Johnath",
        lastName: "Glanton",
        email: "jglantoni@google.com.br",
        verified: false,
        active: true,
        _id: "64af6506fc13ae38b5beec68",
    },
    {
        firstName: "Berty",
        lastName: "Tandey",
        email: "btandeyj@is.gd",
        verified: false,
        active: true,
        _id: "64af6506fc13ae38b5beec69",
    },
];

type Person = {
    firstName: string;
    lastName: string;
    email: string;
    verified: boolean;
    active: boolean;
    _id: string;
};

const columnsDef: Array<ColumnDef<Person>> = [
    { accessorFn: (row) => row._id, accessorKey: "id", header: "ID" },
    {
        accessorFn: (row) => `${row.lastName}, ${row.firstName}`,
        accessorKey: "fullName",
        header: "Nombre completo",
    },
    { accessorFn: (row) => row.email, accessorKey: "email", header: "Email" },
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
        cell: (row) => (
            <span className="w-full h-full flex justify-center">
                <CircleFill
                    className={`w-2 h-2 ${
                        row.getValue() ? "text-green-500" : "text-red-500"
                    }`}
                />
            </span>
        ),
        accessorKey: "active",
        header: "Activo",
    },
    { cell: (row) => <span>Acciones: Edit - Delete</span>, header: "Acciones" },
];

export default function Table() {
    return <TableGeneric data={nData} columnsDef={columnsDef} />;
}
