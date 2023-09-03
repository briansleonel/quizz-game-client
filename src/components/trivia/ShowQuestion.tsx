export default function ShowQuestion({ question }: { question: string }) {
    return (
        <div className="max-w-4xl mx-auto rounded backdrop-blur-sm backdrop-filter text-white bg-zinc-950/40 p-4 drop-shadow-2xl shadow-lg">
            <div className=" bg-white text-neutral-900 font-normal md:font-semibold text-4xl text-center leading-snug p-4 px-6 rounded">
                <h4>{question}</h4>
            </div>
        </div>
    );
}
