import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Image: String
})


export default mongoose.model("users", userSchema)