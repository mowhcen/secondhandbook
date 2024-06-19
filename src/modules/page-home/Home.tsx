"use client";

import { useState, useEffect } from "react";
import { LoadingIndicator, ErrorComponent } from "#components";
import { Book, BooksResponse } from "#types";
import Link from "next/link";

export function Home() {
    return (
        <div className="homepage">
            <div className="hero w-full">
                <h1>Welcome to BookStore</h1>
                <p>Your one-stop shop for second-hand books</p>
            </div>
            <FeaturedBook />
        </div>
    );
}

function FeaturedBook() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/get-books");
                const data: BooksResponse = await response.json();
                setBooks(data.data.slice(0, 8));
            } catch (error) {
                setError("Error fetching books");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <LoadingIndicator />;
    if (error) return <ErrorComponent message={error} />;

    return (
        <ul className="featured-books container">
            {books.map((book) => (
                <Link key={book.id} className="book-card" href={`/books/${book.id}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={book.image} alt={book.title} />
                    <div className="title">Title: {book.title}</div>
                    <div className="author">Author: {book.artist}</div>
                    <div className="category">Category: {book.category}</div>
                    <div className="price">Price: ${book.price}</div>
                </Link>
            ))}
        </ul>
    );
}
