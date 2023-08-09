import { useRouter } from "next/navigation";

export function useNavigationRouter() {
    const router = useRouter();

    function goTo(to: string) {
        router.push(to);
    }

    return { goTo };
}
