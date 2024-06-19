import { NextResponse } from "next/server";
import { books } from "#constants";

export async function GET() {
    return NextResponse.json({ data: books, message: "Successful!" });
}
