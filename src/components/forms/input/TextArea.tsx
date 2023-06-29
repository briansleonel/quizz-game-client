import { classNames } from "@/libs/classNames";
import { useFormContext } from "react-hook-form";

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    className?: string;
}

export default function TextArea({
    name,
    className,
    placeholder,
    label,
}: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className={classNames("w-full", className ? className : "")}>
            <div className="text-start mb-1 w-full">
                <label htmlFor={name}>{label}</label>
            </div>
            <textarea
                placeholder={placeholder}
                id={name}
                className={`w-full resize-none px-2 py-1 transition-colors ease-in-out duration-500 outline-none rounded-md text-gray-950 border border-gray-400 bg-stone-50 focus:border-blue-600 ${
                    errors[name] ? "border-red-500 focus:border-red-500" : ""
                }`}
                rows={3}
                {...register(name)}
            ></textarea>
        </div>
    );
}
