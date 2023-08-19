import { useLogout } from "@/hooks/useLogout";
import { useAppSelector } from "@/store/hooks.redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../button/ButtonPrimary";
import { BoxArrowRight } from "react-bootstrap-icons";

export default function ButtonsLoginRegisterLogout() {
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
                    <span>Salir</span>
                </Button>
            )}
        </>
    );
}
