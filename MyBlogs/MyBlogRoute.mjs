import express from "express"
import jwt from 'jsonwebtoken'
import blogSchema from "../Blogs/blogSchema.mjs"

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


route.get('/postlength', async (req, res) => {
    const userEmail = req?.query.data
    const query = { email: userEmail }
    const result = await blogSchema.find(query)
    res.send({ length: result.length })
})


route.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const result = await blogSchema.findByIdAndDelete(id)
    res.send(result)
})

route.put("/update", async(req,res)=>{
    const data = req.body
})



route.post("/jwt", async (req, res) => {
    const email = req.body
    const token = jwt.sign(email, process.env.user_token, { expiresIn: "1h" })
    res
        .cookie("token", token,
            {
                httpOnly: false,
                secure: true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
            })
        .send(token)

})

export default route