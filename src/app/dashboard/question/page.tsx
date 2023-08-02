import TableQuestions from "@/components/data-table/table-question/TableQuestion";
import Filters from "@/components/filter/Filters";
import QuestionForm from "@/components/forms/question/QuestionForm";
import { Title } from "@/components/layout/Title";

export default function QuestionPage() {
    return (
        <div className="w-full flex flex-col items-center gap-4 md:gap-6 py-8 px-4 md:p-8">
            <Title>Preguntas</Title>
            <Filters />
            <TableQuestions />
        </div>
    );
}
