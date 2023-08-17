"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
    BoxArrowRight,
    Diagram2Fill,
    GearFill,
    House,
    Journals,
    List,
    PeopleFill,
    X,
} from "react-bootstrap-icons";
import logo from "@/assets/quiz-2.jpg";
import { NavLink } from "@/types/util";
import { useAppSelector } from "@/store/hooks.redux";
import Button from "../button/ButtonPrimary";
import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

const menuItems: Array<NavLink> = [
    { name: "Inicio", icon: House, href: "/dashboard" },
    { name: "Categorías", icon: Diagram2Fill, href: "/dashboard/category" },
    { name: "Preguntas", icon: Journals, href: "/dashboard/question" },
    { name: "Usuarios", icon: PeopleFill, href: "/dashboard/user" },
    { name: "Mi cuenta", icon: GearFill, href: "/dashboard/account" },
];

export default function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <nav className="w-full h-16 flex justify-between z-20 p-4 bg-stone-950 text-white md:px-16 lg:px-32 sticky top-0">
            {/** Logo main */}
            <Link
                href="/"
                className="flex items-center h-full cursor-pointe text-2xl font-light gap-4 text-white hover:text-white hover:no-underline"
            >
                <Image src={logo} alt="" className="w-8 h-8" />
                <span>Quizz Game</span>
            </Link>

            <Button
                className="cursor-pointer w-8 h-8 text-slate-300 block md:hidden bg-transparent hover:bg-transparent p-0"
                onClick={() => setShowSidebar(!showSidebar)}
            >
                <List className="w-full h-full" />
            </Button>

            <div className="hidden md:flex items-center gap-4">
                <ButtonsLoginRegisterLogout />
            </div>

            {/** Menu --- lo muestro si un usuario esta autenticado  */}

            <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
        </nav>
    );
}

const Sidebar = ({
    showSidebar,
    setShowSidebar,
}: {
    showSidebar: boolean;
    setShowSidebar: (state: boolean) => void;
}) => {
    return (
        <aside
            className={`flex flex-col gap-8 text-white bg-stone-950 w-full h-screen md:h-[calc(100vh-4rem)] transition-all duration-1000 ease-in-out fixed top-0 md:top-16 ${
                showSidebar ? "left-0" : "-left-full md:left-0"
            } ${showSidebar ? "md:w-52" : "md:w-16"}`}
        >
            {/** Botón Open/Close */}
            <div className="flex justify-end p-4">
                <div
                    className="cursor-pointer w-8 h-8"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    <X className="w-full h-full block md:hidden" />
                    {showSidebar ? (
                        <X className="w-full h-full hidden md:block" />
                    ) : (
                        <List className="w-full h-full hidden md:block" />
                    )}
                </div>
            </div>

            <div className="h-full flex flex-col justify-between">
                {/** Items */}
                <div className="flex flex-col gap-2 relative">
                    {menuItems.map((link, i) => (
                        <Link
                            href={link.href}
                            key={link.name}
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
                                    !showSidebar &&
                                    "opacity-0 translate-x-28 overflow-hidden"
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
                    ))}
                </div>

                {/** Buttons Login/Register */}
                {showSidebar && (
                    <div className="flex flex-col gap-4 md:hidden md:gap-2 px-12 pt-4 pb-12 md:p-4">
                        <ButtonsLoginRegisterLogout />
                    </div>
                )}
            </div>
        </aside>
    );
};

function ButtonsLoginRegisterLogout() {
    const [isClient, setIsClient] = useState(false);
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { handlerLogout } = useLogout();

    const router = useRouter();

    const goToRegister = () => {
        router.push("/register");
    };

    const goToLogin = () => {
        router.push("/login");
    };
    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <>
            {!isAuthenticated && isClient && (
                <>
                    <Button
                        className="text-sm font-light uppercase bg-stone-950 border border-white hover:bg-white hover:text-black px-4"
                        onClick={() => goToLogin()}
                    >
                        Ingresar
                    </Button>

                    <Button
                        className="text-sm font-light uppercase bg-indigo-800 hover:bg-indigo-700 hover:text-white px-4"
                        onClick={() => goToRegister()}
                    >
                        Crear Cuenta
                    </Button>
                </>
            )}
            {isAuthenticated && isClient && (
                <Button
                    className="bg-red-600 hover:bg-red-500 text-sm font-light uppercase flex items-center justify-center gap-2 px-4"
                    onClick={() => handlerLogout()}
                >
                    <BoxArrowRight />
                    <span>Cerrar Sesión</span>
                </Button>
            )}
        </>
    );
}

/*
{isAuthenticated && (
                    <Button
                        className="bg-red-600 hover:bg-red-500 text-sm font-light uppercase flex items-center justify-center gap-2 px-4"
                        onClick={() => handlerLogout()}
                    >
                        <BoxArrowRight />
                        <span>Cerrar Sesión</span>
                    </Button>
                )}
*/
