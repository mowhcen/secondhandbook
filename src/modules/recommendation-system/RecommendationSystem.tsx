// src/components/RecommendationSystem.tsx
import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Book } from "#types";

export function RecommendationSystem({ books }: { books: Book[] }) {
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

    useEffect(() => {
        const recommendBooks = async () => {
            // Mock user interaction data
            const userHistory = [
                { title: "Book A", genre: "Fiction", rating: 5 },
                { title: "Book B", genre: "Mystery", rating: 4 },
            ];

            // Prepare training data
            const trainingData = books.map((book) => ({
                input: [book.category === Book.Category.Fiction ? 1 : 0, book.category === Book.Category.Mystery ? 1 : 0],
                output: { [book.title]: book.rating / 5 },
            }));

            // Train model
            const model = new tf.Sequential();
            model.add(tf.layers.dense({ units: 8, inputShape: [2], activation: "relu" }));
            model.add(tf.layers.dense({ units: books.length, activation: "softmax" }));

            model.compile({
                optimizer: "adam",
                loss: "categoricalCrossentropy",
                metrics: ["accuracy"],
            });

            const xs = tf.tensor2d(trainingData.map((d) => d.input));
            const ys = tf.tensor2d(trainingData.map((d) => Object.values(d.output)));

            await model.fit(xs, ys, { epochs: 100 });

            // Predict recommendations
            const userVector = tf.tensor2d([[1, 0]]); // Example: User prefers Fiction
            const predictions = (model.predict(userVector) as tf.Tensor<tf.Rank>).arraySync() as number[][];
            const predictedScores = predictions[0];

            const recommended = books
                .map((book, index) => ({
                    ...book,
                    score: predictedScores[index],
                }))
                .sort((a, b) => b.score - a.score)
                .slice(0, 5);

            setRecommendedBooks(recommended);
        };

        recommendBooks();
    }, [books]);

    return (
        <div className="container">
            <h2 className="text-3xl font-bold text-blue-500">Recommended Books</h2>
            <ul className="flex items-center gap-x-5">
                {recommendedBooks.map((book) => (
                    <li className="text-sm font-bold" key={book.id}>
                        {book.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
