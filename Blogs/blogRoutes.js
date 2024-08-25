import express from 'express'
import blogSchema from './blogSchema.js';
import { isValidObjectId } from 'mongoose';
const router = express.Router()


router.get("/blogs", async (req, res) => {
    const result = await blogSchema.find().sort()
    res.send(result)
})

router.get("/blogs/:id", async (req, res) => {
    const id = req.params.id
    const result = await blogSchema.findById(id)
    res.send(result)

})


router.get('/likes/:id', async(req,res)=>{
    const id = req.params.id
    const user = req.query.user
    const result = await blogSchema.findById(id)
    if (result) {
        const like = result?.likes?.find(e=> e== user)
        res.send(like)    
    }

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
    let update = {}

    if(data?.likes){
        update = {
            $set : {
                likes : data?.likes
            }
        }
    }
    if(data?.comments){
        update = {
            $set : {
                comments : data?.comments
            }
        }
    }
 const options = {upsert: true }

    const result = await blogSchema.findByIdAndUpdate(id, update, options)
    // console.log(result);
    res.send(result)

})


export default router