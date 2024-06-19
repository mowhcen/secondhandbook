import { Book } from "#types";
import Link from "next/link";
import React from "react";

interface Props {
    books: Book[];
}

export function BookList({ books }: Props) {
    return (
        <div className="container">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">Book List</h2>
            <ul className="book-list">
                {books.map((book) => (
                    <li key={book.id} className="book-item">
                        <Link href={`/books/${book.id}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={book.image} alt={book.title} />
                            <div className="title">Title: {book.title}</div>
                            <div className="author">Author: {book.artist}</div>
                            <div className="category">Category: {book.category}</div>
                            <div className="price">Price: ${book.price}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
