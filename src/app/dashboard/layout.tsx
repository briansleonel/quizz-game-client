interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    return (
        <div className="w-full md:w-[calc(100%-4rem)] min-h-screen m-auto md:ml-16">
            {children}
        </div>
    );
}

//w-full md:w-[calc(100%-4rem)] min-h-screen m-auto md:ml-16 relative
//<Sidebar />
