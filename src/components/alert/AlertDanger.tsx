import { classNames } from "@/libs/classNames";

interface Props {
    className?: string;
    children: React.ReactNode;
}

export default function AlertDanger({ className, children }: Props) {
    return (
        <span
            className={classNames(
                "w-full bg-red-500 rounded-sm text-white text-normal p-4 text-center",
                className ? className : ""
            )}
        >
            {children}
        </span>
    );
}
