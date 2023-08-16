import CategoryForm from "@/components/forms/category/CategoryForm";
import ContainerUtil from "@/components/layout/ContainerUtil";
import { Title } from "@/components/layout/Title";

export default function CategoryPage() {
    return (
        <ContainerUtil>
            <Title>Categorías</Title>
            <CategoryForm />
        </ContainerUtil>
    );
}
