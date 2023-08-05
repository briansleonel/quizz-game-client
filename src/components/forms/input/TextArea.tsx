import { classNames } from "@/libs/classNames";

interface Props {
    name: string;
    placeholder?: string;
    className?: string;
    inputProps: {
        value: string;
        onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
    };
}

export function TextArea({ inputProps, name, className, placeholder }: Props) {
    return (
        <textarea
            placeholder={placeholder}
            id={name}
            className={classNames(
                "w-full px-2 py-1 transition-colors ease-in-out duration-500 outline-none rounded-md text-gray-950 border border-gray-400 bg-neutral-50 focus:border-violet-900 drop-shadow",
                className ? className : ""
            )}
            rows={3}
            {...inputProps}
        ></textarea>
    );
}
