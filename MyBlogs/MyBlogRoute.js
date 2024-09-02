import { Router } from "express";
import express from "express"
import jwt from 'jsonwebtoken'

const route = express.Router()

// route.get('/my-blogs', async(req,res)=>{
//     const email = req.params.email
//     console.log(email);

// })

route.post("/login", async (req, res) => {
    const email = req.body
    const token = jwt.sign(email, process.env.user_token, { expiresIn: "1h" })
    res.cookie(
       "token", token,
        {
            httpOnly: false,
            secure: true,
            sameSite: process.env.user_token === "production" ? "none" : "strict"
        })
        .send(token)

})



export default route