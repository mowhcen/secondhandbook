import { Book } from "#types";
import Link from "next/link";
import React from "react";

interface Props {
    books: Book[];
}

export function BookList({ books }: Props) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Book List</h2>
            <ul className="book-list">
                {books.map((book) => (
                    <li key={book.id} className="book-item">
                        <Link href={`/books/${book.id}`}>
                            <div className="title">Title: {book.title}</div>
                            <div className="author">Author: {book.artist}</div>
                            <div>Category: {book.category}</div>
                            <div className="price">Price: ${book.price}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
