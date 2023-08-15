import TableQuestions from "@/components/data-table/table-question/TableQuestion";
import FiltersQuestion from "@/components/filter/FiltersQuestion";
import { Title } from "@/components/layout/Title";

export default function QuestionPage() {
    return (
        <div className="w-full flex flex-col items-center gap-8 py-10 px-4 md:px-8 md:py-12">
            <Title>Preguntas</Title>
            <FiltersQuestion />
            <TableQuestions />
        </div>
    );
}
