"use client";

import ContainerUtil from "@/components/layout/ContainerUtil";
import { Title } from "@/components/layout/Title";
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
    { name: "Inicio", icon: House, href: "/" },
    { name: "Categorías", icon: Diagram2Fill, href: "/dashboard/category" },
    { name: "Preguntas", icon: Journals, href: "/dashboard/question" },
    { name: "Usuarios", icon: PeopleFill, href: "/dashboard/user" },
    { name: "Mi cuenta", icon: GearFill, href: "/dashboard/account" },
];

export default function DashboardPage() {
    const { user } = useAppSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <ContainerUtil>
            {isClient && (
                <Title>
                    ¡Bienvenid@{" "}
                    <span className="text-indigo-600">{user.fullName}</span>!
                </Title>
            )}

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <LinkIndex link={menuItems[0]} />
                <LinkIndex
                    link={menuItems[1]}
                    className="bg-orange-500 hover:bg-orange-500/95"
                />
                <LinkIndex
                    link={menuItems[2]}
                    className="bg-emerald-600 hover:bg-emerald-600/95"
                />
                {user.role === Role.ADMIN && (
                    <LinkIndex
                        link={menuItems[3]}
                        className="bg-indigo-600 hover:bg-indigo-600/95"
                    />
                )}
                <LinkIndex
                    link={menuItems[4]}
                    className={`bg-neutral-900 hover:bg-neutral-900/95 ${user.role === Role.ADMIN ? "col-span-2" : "col-span-1"}`}
                />
            </div>
        </ContainerUtil>
    );
}

function LinkIndex({ link, className }: { link: NavLink; className?: string }) {
    return (
        <Link
            href={link.href}
            className={`flex items-center justify-center gap-4  rounded p-8 text-3xl font-light uppercase shadow-md bg-blue-600 hover:bg-blue-600/90 text-white ${className}`}
        >
            {React.createElement(link.icon, {
                size: "2.2rem",
            })}
            <span>{link.name}</span>
        </Link>
    );
}
