export function ContainerForm({ children }: { children: React.ReactNode }) {
    return (
        <section className="w-full md:w-8/12 lg:w-5/12 p-4 md:p-8 bg-white rounded-md shadow drop-shadow-xl">
            {children}
        </section>
    );
}
