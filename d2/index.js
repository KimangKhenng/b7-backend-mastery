import express from 'express';

const app = express();
const PORT = 3000

app.get('/', (req, res) => {
    console.log(req.ip)
    res.status(201).json({ message: "Hello World 3" })
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});