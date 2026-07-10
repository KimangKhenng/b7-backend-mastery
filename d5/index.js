import express from 'express';
import morgan from 'morgan';
const PORT = 3000
const app = express();
import { connectToDatabase, client } from './db.js';

// app.use(morgan('combined'));

// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

await connectToDatabase();

const database = client.db('blog');
const users = database.collection('users');

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello World"
    })
})

app.get('/users', async (req, res) => {
    // Do some operation in DB
    const allUsers = await users.find({}).toArray();
    return res.json(allUsers)
})

app.get('/users/:email', async (req, res) => {
    const email = req.params.email
    const user = await users.findOne({ email: email })
    return res.json(user)
})

app.post('/users', async (req, res) => {
    const { username, email, age } = req.body
    try {
        // Insert one document
        const result = await users.insertOne({
            username: username,
            email: email,
            age: age,
            createdAt: new Date()
        });
        res.json(result)
    } catch (err) {
        throw err
    }
})



// The last one
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})