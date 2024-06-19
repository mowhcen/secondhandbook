import { Book } from "#types";
import { faker } from "@faker-js/faker";
import { times } from "lodash";

const CATEGORIES = [Book.Category.Fiction, Book.Category.NonFiction, Book.Category.Science, Book.Category.Mystery];

export const books = times(100).map((value, index) => ({
    id: value + 1,
    artist: faker.person.fullName(),
    category: CATEGORIES[index % 4],
    description: faker.lorem.paragraph(),
    price: faker.number.float({ min: 10, max: 40 }),
    title: faker.word.words(),
}));
