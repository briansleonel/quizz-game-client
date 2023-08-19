import { useAppSelector } from "@/store/hooks.redux";
import { useEffect, useState } from "react";
import { PersonCircle } from "react-bootstrap-icons";

export default function Username() {
    const [isClient, setIsClient] = useState(false);
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isAuthenticated && isClient && (
                <div className="flex items-center justify-center gap-2 md:gap-1 text-neutral-400 italic font-light">
                    <PersonCircle />
                    <span className=" text-neutral-400">{user.username}</span>
                </div>
            )}
        </>
    );
}
