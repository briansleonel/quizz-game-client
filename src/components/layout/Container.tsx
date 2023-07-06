export default function Container({ children }: { children: React.ReactNode }) {
    return <div className="w-full min-h-[calc(100vh-4rem)]">{children}</div>;
}

//w-full md:w-[calc(100%-4rem)] min-h-screen m-auto md:ml-16 relative
