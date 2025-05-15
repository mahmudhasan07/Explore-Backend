import express from "express"
import jwt from 'jsonwebtoken'
import blogSchema from "../Blogs/blogSchema.mjs"
import userSchema from "../Blogs/userSchema.mjs"

const route = express.Router()

route.get("/mypost", async (req, res) => {
    const userEmail = req?.query.data
    const query = { email: userEmail }
    const result = await blogSchema.find(query)
    res.send(result)
})

route.get('/mypost/:email', async (req, res) => {
    const email = req.params.email
    const length = req.query.data
    const query = { email: email }
    const result = await blogSchema.find(query).limit(length)
    res.send(result)
})

route.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const result = await blogSchema.findByIdAndDelete(id)
    res.send(result)
})



export default route