/*
"use client";

import { NavLink } from "@/types/util";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
    Diagram2Fill,
    GearFill,
    House,
    Journals,
    List,
    PeopleFill,
    X,
} from "react-bootstrap-icons";

const menuItems: Array<NavLink> = [
    { name: "Inicio", icon: House, href: "/dashboard" },
    { name: "Categorías", icon: Diagram2Fill, href: "/dashboard/category" },
    { name: "Preguntas", icon: Journals, href: "/dashboard/question" },
    { name: "Usuarios", icon: PeopleFill, href: "/dashboard/user" },
    { name: "Mi cuenta", icon: GearFill, href: "/dashboard/account" },
];

const Sidebar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    //fixed top-0 left-0 z-20
    return (
        <>
            <nav className="flex md:hidden h-16 w-full bg-red-600">
                <div
                    className="cursor-pointer w-8 h-8 text-slate-300"
                    onClick={() => setOpen(!open)}
                >
                    {open ? (
                        <X className="w-full h-full" />
                    ) : (
                        <List className="w-full h-full" />
                    )}
                </div>
            </nav>
            <aside
                className={`hidden md:block bg-slate-950 min-h-screen ${
                    open ? "w-48" : "w-16"
                } duration-500 text-gray-100 fixed top-0 left-0 z-20`}
            >
                <div className="flex justify-end p-4">
                    <div
                        className="cursor-pointer w-8 h-8 text-slate-300"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <X className="w-full h-full" />
                        ) : (
                            <List className="w-full h-full" />
                        )}
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 relative">
                    {menuItems.map((item, i) => (
                        <Link
                            href={item.href}
                            key={i}
                            className={`group flex items-center text-sm gap-5 font-medium px-5 py-3 hover:bg-violet-700 w-full ${
                                pathname === item.href ? "bg-violet-700" : ""
                            }`}
                            onClick={() => setOpen(false)}
                        >
                            <span className="w-6 h-6">
                                {React.createElement(item.icon, {
                                    size: "20",
                                })}
                            </span>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${
                                    !open &&
                                    "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                            >
                                {item.name}
                            </h2>
                            <h2
                                className={`${
                                    open && "hidden"
                                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {item?.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
*/
