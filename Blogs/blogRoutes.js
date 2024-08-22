import express from 'express'
import blogSchema from './blogSchema.js';
import { isValidObjectId } from 'mongoose';
const router = express.Router()


router.get("/blogs", async (req, res) => {
    const result = await blogSchema.find()
    res.send(result)
})

router.get("/blogs/:id", async (req, res) => {
    const id = req.params.id
    const result = await blogSchema.findById(id)
    res.send(result)

})
router.post("/blogs", async (req, res) => {
    const data = req.body
    console.log(data);

    const result = await blogSchema.insertMany(data)
    res.send(result)
})


router.patch(`/blogs/:id`, async (req, res) => {
    const id = req.params.id
    const data = req.body
    console.log(data);

    // const query = {_id : new isValidObjectId()}
    const update = {
        $set : {
            likes : data?.likes
        }
    }

    const options = {upsert: true }

    const result = await blogSchema.findByIdAndUpdate(id, update, options)
    // console.log(result);
    res.send(result)

})


export default router