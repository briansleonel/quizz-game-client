interface Props {
    label: string;
    name: string;
    children: React.ReactNode;
}

export default function Label({ children, label, name }: Props) {
    return (
        <div className="w-full">
            <div className="text-start mb-1 w-full">
                <label htmlFor={name}>{label}</label>
            </div>
            {children}
        </div>
    );
}
