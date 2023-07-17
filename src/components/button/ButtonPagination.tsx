export default function ButtonPagination({
    children,
    onClick,
    title,
}: {
    children: React.ReactNode;
    onClick: () => void;
    title?: string;
}) {
    return (
        <button
            className="px-2 md:px-3 md:py-1 border border-neutral-300 rounded text-neutral-500 flex items-center uppercase"
            onClick={onClick}
            title={title ? title : ""}
        >
            {children}
        </button>
    );
}
