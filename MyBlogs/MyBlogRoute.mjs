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

route.put("/update", async (req, res) => {
    const data = req.body
})


route.get('/users/:email', async (req, res) => {
    const email = req.params.email
    const query = { Email: email }
    const result = await userSchema.findOne(query).populate('Followings').populate('Followers')
    res.send(result)
})


route.patch('/user/:email', async (req, res) => {
    const email = req.params.email
    const data = req.body
    console.log(data);

    const query = { Email: email }
    const options = {
        upsert: true
    }
    const updateDoc = {
        $push: {
            Followings: data?.id
        }
    }

    const result = await userSchema.updateOne(query, updateDoc, options)
    res.send(result)

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