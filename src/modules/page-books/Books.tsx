"use client";

import { RecommendationSystem } from "#modules/recommendation-system";
import { BookList, ErrorBoundary, ErrorComponent, FilterOptions, LoadingIndicator, Pagination, SearchBar } from "#components";
import { useEffect, useState } from "react";
import { Book, BooksResponse } from "#types";

export function Books() {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterOptions, setFilterOptions] = useState({ category: "", artist: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/get-books");
                const data: BooksResponse = await response.json();
                setBooks(data.data);
            } catch (error) {
                setError("Error fetching books");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filterOptions.category === "" || book.title === filterOptions.category) &&
            (filterOptions.artist === "" || book.artist === filterOptions.artist)
    );

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) return <LoadingIndicator />;
    if (error) return <ErrorComponent message={error} />;

    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-6 container">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <FilterOptions filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
            </div>
            <ErrorBoundary>
                <BookList books={currentBooks} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
                    onPageChange={paginate}
                />
                <RecommendationSystem books={books} />
            </ErrorBoundary>
        </div>
    );
}
