import express from 'express';
import morgan from 'morgan'
import helmet from 'helmet'
import router from './routes/index.js';
const app = express();
const PORT = 3000

const simpleMiddleware = (req, res, next) => {
    console.log("Middleware!")
    next()
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'))
app.use(helmet())
// app.use(simpleMiddleware);




app.use('/api', router)
app.get('/api/grades', (req, res) => {
    throw Error("Not Found")
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});