import { times } from "lodash";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pageNumbers = times(totalPages).map((num) => num + 1);

    return (
        <div className="flex justify-center mt-4">
            <ul className="flex">
                {pageNumbers.map((number) => (
                    <li key={number} className={`mx-1 ${currentPage === number ? "font-bold" : ""}`}>
                        <button onClick={() => onPageChange(number)} className="px-2 py-1 border rounded">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
