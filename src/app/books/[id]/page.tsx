import { BookDetails } from "#modules/page-details";
import { notFound } from "next/navigation";

export default function BookDetailsPage({ params }: { params: { id: number } }) {
    if (!params.id) notFound();

    return <BookDetails bookId={params.id} />;
}
