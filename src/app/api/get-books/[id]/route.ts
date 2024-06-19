import { NextRequest, NextResponse } from "next/server";
import { books } from "#constants";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    const book = books.find((book) => book.id.toString() === params.id);

    if (typeof book === "undefined") {
        return new Response(`No book with this Id available`, {
            status: 404,
        });
    }

    return Response.json({ data: book, message: "Successful!" });
}
