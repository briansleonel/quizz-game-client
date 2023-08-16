import TableQuestionCategory from "@/components/data-table/table-category/TableQuestionCategory";
import CategoryForm from "@/components/forms/category/CategoryForm";
import ContainerUtil from "@/components/layout/ContainerUtil";
import { Title } from "@/components/layout/Title";
import ModalCategory from "@/components/modal/ModalCategory";

export default function CategoryPage() {
    return (
        <ContainerUtil>
            <Title>Categorías</Title>
            {/*<CategoryForm />*/}
            <div className="w-full flex justify-end">

            <ModalCategory edit={false} />
            </div>
            <TableQuestionCategory />
        </ContainerUtil>
    );
}
