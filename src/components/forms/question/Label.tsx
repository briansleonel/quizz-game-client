import { classNames } from "@/libs/classNames";

interface Props {
    label: string;
    name: string;
    children: React.ReactNode;
    className?: string;
}

export default function Label({ children, label, name, className }: Props) {
    return (
        <div className="w-full">
            <div
                className={classNames(
                    "text-start mb-1 w-full ",
                    className ?? ""
                )}
            >
                <label htmlFor={name}>{label}</label>
            </div>
            {children}
        </div>
    );
}
