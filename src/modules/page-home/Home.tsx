"use client";

import { useState, useEffect } from "react";
import { BookList, SearchBar, ErrorBoundary, FilterOptions, LoadingIndicator, ErrorComponent, Pagination } from "#components";
import { Book, BooksResponse } from "#types";
import { RecommendationSystem } from "#modules/recommendation-system";

export function Home() {
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
        <div className="container mx-auto p-4">
            <div className="hero">
                <h1>Welcome to BookStore</h1>
                <p>Your one-stop shop for second-hand books</p>
            </div>
            <FeaturedBook />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FilterOptions filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
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

function FeaturedBook() {
    return (
        <div className="featured-books">
            <div className="book-card">
                <img src="/path/to/book1.jpg" alt="Book 1" />
                <div className="title">Book Title 1</div>
                <div className="author">Author 1</div>
                <div className="price">$10.00</div>
            </div>
            <div className="book-card">
                <img src="/path/to/book2.jpg" alt="Book 2" />
                <div className="title">Book Title 2</div>
                <div className="author">Author 2</div>
                <div className="price">$12.00</div>
            </div>
            {/* Add more book cards as needed */}
        </div>
    );
}
