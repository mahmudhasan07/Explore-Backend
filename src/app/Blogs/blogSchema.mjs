import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    name: String,
    location: String,
    details: String,
    email: String,
    hostImages: Array,
    likes: Array,
    comments: Array,
    averageRatting: Number,
    date : String
})

export default mongoose.model("blogs", blogSchema)
// module.exports = new mongoose.model("blogSchema", blogSchema)