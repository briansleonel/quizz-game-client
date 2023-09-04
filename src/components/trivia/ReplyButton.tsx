interface Props {
    className?: string;
    option: string;
    onSelectAnswer: (selected: string) => void;
    children: React.ReactNode;
}

export default function ReplyButton({
    option,
    onSelectAnswer,
    className,
    children,
}: Props) {
    return (
        <button
            type="button"
            onClick={() => onSelectAnswer(option)}
            className={`relative bg-white text-black w-full p-4 font-medium uppercase text-base md:text-2xl  rounded hover:bg-indigo-700 active:bg-indigo-700 active:text-white hover:text-white transition-all duration-500 shadow shadow-neutral-900 ${className}`}
        >
            {children}
        </button>
    );
}
