"use client";

import { useAppSelector } from "@/store/hooks.redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function IsAuth<T>(Component: React.ComponentType<T>) {
    return function ProtectedRoute(props: T) {
        const router = useRouter();
        const { isAuthenticated } = useAppSelector((state) => state.auth);

        useEffect(() => {
            if (!isAuthenticated) {
                return router.replace("/login");
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated) {
            return <>Cargando..</>;
        }

        return (
            <>
                <Component {...props!} />
            </>
        );
    };
}
