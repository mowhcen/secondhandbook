"use client";

import { useEffect, useState } from "react";
import { LoadingIndicator, ErrorComponent } from "#components";
import { Book, BookResponse } from "#types";

interface Props {
    bookId: number;
}

export function BookDetails({ bookId }: Props) {
    const [book, setBook] = useState<Book | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/get-books/${bookId}`);
                const data = (await response.json()) as BookResponse;
                setBook(data.data);
            } catch (error) {
                setError("Error fetching book details");
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [bookId]);

    if (loading) return <LoadingIndicator />;
    if (error) return <ErrorComponent message={error} />;
    if (!book) return null;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Book Details</h2>
            <div>Title: {book.title}</div>
            <div>Author: {book.artist}</div>
            <div>Category: {book.category}</div>
            <div>Price: ${book.price}</div>
            <div>Description: {book.description}</div>
        </div>
    );
}
