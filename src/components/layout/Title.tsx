interface Props {
    title: string;
    color?: string;
    mb?: string;
}

export default function Title({ title, color, mb }: Props) {
    return (
        <div
            className={`w-full font-semibold text-2xl text-center ${mb} ${color}`}
        >
            <h1>{title}</h1>
        </div>
    );
}
