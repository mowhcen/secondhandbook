export type BooksResponse = {
    data: Book[];
    message: string;
};

export type BookResponse = {
    data: Book;
    message: string;
};

export namespace Book {
    export enum Category {
        Fiction = "fiction",
        NonFiction = "non-fiction",
        Science = "science",
        Mystery = "mystery",
    }
}

export type Book = {
    id: number;
    title: string;
    artist: string;
    price: string;
    description: string;
    rating: number;
    category: `${Book.Category}`;
};
