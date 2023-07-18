import { ApiPagination, PaginationFetch } from "@/types/api";
import { ChangeEvent } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import ButtonPagination from "../button/ButtonPagination";

interface Props {
    pagination: ApiPagination;
    setPagination: (state: ApiPagination) => void;
}
/**
 * Proporcina un componente de paginación para tablas de datos
 * @param param0
 * @returns componente de React
 */
export default function Pagination({ pagination, setPagination }: Props) {
    /**
     * Permite establecer un nuevo valor al límite de paginación, cuando el elemento seleccionado de un Select cambia
     * @param e elemento HTML
     */
    const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setPagination({
            ...pagination,
            page: 1,
            limit: Number(e.currentTarget.value),
        });
    };

    const prevPage = () => {
        if (pagination.hasPrevPage && pagination.prevPage) {
            setPagination({
                ...pagination,
                page: pagination.prevPage,
            });
        }
    };

    const nextPage = () => {
        if (pagination?.hasNextPage && pagination.nextPage) {
            setPagination({
                ...pagination,
                page: pagination.nextPage,
            });
        }
    };

    /*
    const changePage = (page: number) => {
        setOptionsFetch({ ...optionsFetch, page });
    };

    const showButtonsPage = () => {
        const buttons: Array<React.ReactNode> = [];
        if (pagination)
            for (let page = 1; page <= pagination.totalPages; page++) {
                buttons.push(
                    <ButtonPagination
                        key={page}
                        onClick={() => changePage(page)}
                    >
                        {page}
                    </ButtonPagination>
                );
            }
        return buttons;
    };
    */

    return (
        <div className="w-full flex justify-between items-center mt-4">
            <span className="text-neutral-500 text-xs uppercase hidden md:block">
                Total de resultados:{" "}
                <b className="text-sm">{pagination.totalData}</b>
            </span>

            <div className="flex w-full md:w-fit gap-0 md:gap-12 justify-between md:justify-normal">
                <div>
                    <label
                        htmlFor="limit"
                        className="text-neutral-500 text-xs uppercase mr-2"
                    >
                        Límite :{" "}
                    </label>
                    <select
                        name="limit"
                        id="limit"
                        className="px-2 md:px-3 py-1 border rounded border-neutral-300 text-neutral-500 focus:outline-none text-sm bg-white"
                        onChange={(e) => onChangeSelect(e)}
                    >
                        {[10, 15, 20, 30, 50].map((e, i) => (
                            <option key={e}>{e}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-2 md:gap-4">
                    <ButtonPagination
                        onClick={() => prevPage()}
                        title="Página siguiente"
                    >
                        <ChevronLeft />{" "}
                        <span className="text-xs ml-2 leading-[0]">
                            Anterior
                        </span>
                    </ButtonPagination>
                    {/*showButtonsPage()*/}
                    <ButtonPagination
                        onClick={() => nextPage()}
                        title="Página anterior"
                    >
                        <span className="text-xs mr-2 leading-[0]">
                            Siguiente
                        </span>
                        <ChevronRight />
                    </ButtonPagination>
                </div>
            </div>
        </div>
    );
}
