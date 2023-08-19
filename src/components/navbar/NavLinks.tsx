import { Role } from "@/libs/enums/role.enum";
import { useAppSelector } from "@/store/hooks.redux";
import { NavLink } from "@/types/util";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
    Diagram2Fill,
    GearFill,
    House,
    Journals,
    PeopleFill,
} from "react-bootstrap-icons";

const menuItems: Array<NavLink> = [
    { name: "Inicio", icon: House, href: "/dashboard" },
    { name: "Categorías", icon: Diagram2Fill, href: "/dashboard/category" },
    { name: "Preguntas", icon: Journals, href: "/dashboard/question" },
    { name: "Usuarios", icon: PeopleFill, href: "/dashboard/user" },
    { name: "Mi cuenta", icon: GearFill, href: "/dashboard/account" },
];
const usersDashboard = {
    name: "Usuarios",
    icon: PeopleFill,
    href: "/dashboard/user",
};

export default function NavLinks({
    showSidebar,
    setShowSidebar,
}: {
    showSidebar: boolean;
    setShowSidebar: (state: boolean) => void;
}) {
    const [isClient, setIsClient] = useState(false);
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <>
            {isAuthenticated && isClient && (
                <div className="flex flex-col gap-2 relative">
                    {menuItems.map((link, i) => {
                        if (link.href === "/dashboard/user") {
                            if (user.role === Role.ADMIN) {
                                return (
                                    <LinkComponent
                                        key={link.name}
                                        i={i}
                                        link={link}
                                        setShowSidebar={setShowSidebar}
                                        showSidebar={showSidebar}
                                    />
                                );
                            } else return null;
                        }
                        return (
                            <LinkComponent
                                key={link.name}
                                i={i}
                                link={link}
                                setShowSidebar={setShowSidebar}
                                showSidebar={showSidebar}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}

function LinkComponent({
    i,
    link,
    setShowSidebar,
    showSidebar,
}: {
    i: number;
    link: NavLink;
    showSidebar: boolean;
    setShowSidebar: (state: boolean) => void;
}) {
    return (
        <Link
            href={link.href}
            className="group flex items-center text-xl md:text-lg font-light gap-6 px-12 py-4 md:px-5 md:py-3 hover:bg-violet-600 w-full hover:no-underline text-white hover:text-white"
            onClick={() => setShowSidebar(false)}
        >
            <span className="w-8 h-8 md:w-6 md:h-6 flex items-center">
                {React.createElement(link.icon, {
                    size: "2rem",
                })}
            </span>
            <h6
                style={{
                    transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                    !showSidebar && "opacity-0 translate-x-28 overflow-hidden"
                }`}
            >
                {link.name}
            </h6>
            <span
                className={`${
                    showSidebar && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-950 rounded-sm  drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-500 group-hover:min-w-fit `}
            >
                {link.name}
            </span>
        </Link>
    );
}
