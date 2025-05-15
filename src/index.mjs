import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import blogRoutes from "./app/modules/Blogs/blogRoutes.mjs"
import userRoutes from './app/modules/Users/userRoutes.mjs'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
const app = express()
const port = process.env.PORT || 2000

app.use(cors({
    origin: ['https://explore-world-theta.vercel.app', 'http://localhost:3000'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
async function Run() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.user_pass}@cluster0.oqk84kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        app.use("/", blogRoutes)
        app.use('/', userRoutes)
        console.log("Mongoose connect to the MongoDB");

    }
    catch (err) {
        console.log(err.message);

    }
}

Run()

app.get('/', async (req, res) => {
    res.send({ message: `Server is running` })
})



app.listen(port, () => {
    console.log(`The server is running at ${port} `);
})