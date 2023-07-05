import { classNames } from "@/libs/classNames";
import Link from "next/link";

interface Props {
    href: string;
    text: string;
    className?: string;
}

export default function ButtonLink({ href, text, className }: Props) {
    return (
        <Link
            href={href}
            className={classNames(
                "font-medium px-3 py-2 text-center rounded transition-colors ease-in-out duration-500 text-white bg-blue-700 hover:bg-blue-600",
                className ? className : ""
            )}
        >
            {text}
        </Link>
    );
}
