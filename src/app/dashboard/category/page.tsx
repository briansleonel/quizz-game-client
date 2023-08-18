"use client";

import TableQuestionCategory from "@/components/data-table/table-category/TableQuestionCategory";
import ContainerUtil from "@/components/layout/ContainerUtil";
import { Title } from "@/components/layout/Title";
import ModalCategory from "@/components/modal/ModalCategory";
import { Role } from "@/libs/enums/role.enum";
import { useAppSelector } from "@/store/hooks.redux";
import { useEffect, useState } from "react";

export default function CategoryPage() {
    const { user } = useAppSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <ContainerUtil>
            <Title>Categorías</Title>
            {/*<CategoryForm />*/}
            {isClient && user.role === Role.ADMIN && (
                <div className="w-full flex justify-end">
                    <ModalCategory edit={false} />
                </div>
            )}
            <TableQuestionCategory />
        </ContainerUtil>
    );
}
