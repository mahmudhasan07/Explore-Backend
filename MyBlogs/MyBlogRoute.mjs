import express from "express"
import jwt from 'jsonwebtoken'

const route = express.Router()

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