import 'dotenv/config'
import connectDB from "../config/db.js";
import { faker } from '@faker-js/faker';
import UserModel from '../models/UserModel.js';
import BookModel from '../models/bookModel.js';

await connectDB()

const NUM_USERS = 200
const NUM_BOOKS = 1000
const USER_IDS = []

for (let i = 0; i < NUM_USERS; i++) {
    const user = new UserModel({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 100 })
    })
    await user.save()
    console.log(`User with id: ${user._id} created`)
    USER_IDS.push(user._id)
}
console.log(`Users ${NUM_USERS} generated!`)

for (let i = 0; i < NUM_BOOKS; i++) {
    const book = new BookModel({
        title: faker.book.title(),
        isbn: faker.commerce.isbn(),
        publishedYear: faker.number.int({ min: 1990, max: 2024 }),
        author: faker.helpers.arrayElement(USER_IDS)
    })
    await book.save()
    console.log(`Book with id: ${book._id} created`)
}
console.log(`Books ${NUM_USERS} generated!`)
