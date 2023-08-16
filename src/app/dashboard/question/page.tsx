import TableQuestions from "@/components/data-table/table-question/TableQuestion";
import FiltersQuestion from "@/components/filter/FiltersQuestion";
import ContainerUtil from "@/components/layout/ContainerUtil";
import { Title } from "@/components/layout/Title";

export default function QuestionPage() {
    return (
        <ContainerUtil>
            <Title>Preguntas</Title>
            <FiltersQuestion />
            <TableQuestions />
        </ContainerUtil>
    );
}
