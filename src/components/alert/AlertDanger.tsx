import { classNames } from "@/libs/classNames";

interface Props {
    text: string;
    className?: string;
}

export default function AlertDanger({ text, className }: Props) {
    return (
        <span
            className={classNames(
                "w-full text-xs bg-red-500 py-1 px-2 rounded-sm",
                className ? className : ""
            )}
        >
            {text}
        </span>
    );
}
