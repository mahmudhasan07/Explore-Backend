import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// import data from "./Blogs/blogSchema.js"
import blogRoutes from "./Blogs/blogRoutes.js"
import 'dotenv/config'
import MyBlogRoute from './MyBlogs/MyBlogRoute.js';
// import blogRoutes from '../backend/Blogs/blogRoutes'
const app = express()
const port = 5000

app.use(express.json())
app.use(cors({
    origin : ['http://localhost:3000'],
    credentials : true
}))


async function Run() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.user_pass}@cluster0.oqk84kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("Mongoose connect to the MongoDB");
    }
    catch(err){
        console.log(err.message);
        return
    }
}

Run()



app.get('/', async (req, res) => {
    res.send({ message: "Welcome to our server side" })
})

app.use("/", blogRoutes)
// app.use("/", MyBlogRoute)

app.listen(port, () => {
    console.log(`The server is running at ${port} `);
})