import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Image: String,
    Followings: { type: Array, ref: 'users' },
    Followers: { type: Array, ref: 'users' }
})


export default mongoose.model("users", userSchema)