interface Props {
    className?: string;
    option: string;
    onSelectAnswer: (selected: string) => void;
}

export default function ReplyButton({
    option,
    onSelectAnswer,
    className,
}: Props) {
    return (
        <button
            type="button"
            onClick={() => onSelectAnswer(option)}
            className={`bg-white text-black w-full p-4 font-medium uppercase text-base md:text-2xl  rounded hover:bg-indigo-700 active:bg-indigo-700 active:text-white hover:text-white transition-all duration-500 hover:scale-105 shadow shadow-neutral-900 ${
                className ?? ""
            }`}
        >
            {option}
        </button>
    );
}
