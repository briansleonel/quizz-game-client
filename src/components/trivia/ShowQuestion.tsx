export default function ShowQuestion({ question }: { question: string }) {
    return (
        <div className="w-full bg-white text-black font-normal md:font-medium text-2xl text-center p-6  rounded">
            {question}
        </div>
    );
}
