import express from 'express'
import blogSchema from './blogSchema.js';
const router = express.Router()


router.get("/blogs", async (req, res) => {
    const result = await blogSchema.find().sort()
    res.send(result)
})


router.get('/my-blogs', async (req, res) => {
    const email = req?.query.data
    const query = { email: email }
    const result = await blogSchema.find(query)
    res.send(result)
})

router.get("/blogs/:id", async (req, res) => {
    const id = req.params.id
    const result = await blogSchema.findById(id)
    res.send(result)

})


router.get('/likes/:id', async (req, res) => {
    const id = req.params.id
    const user = req.query.user
    const result = await blogSchema.findById(id)
    if (result) {
        const like = result?.likes?.find(e => e == user)
        res.send(like)
    }

})


router.get("/ratting/:id", async (req, res) => {
    const id = req.params.id
    const result = await blogSchema.findById(id)
    if (result) {
        const totalRatting = result?.comments?.reduce((a, b) => a + b.ratting, 0)
        const averageRatting = totalRatting/result?.comments?.length
        if(averageRatting >0){
            res.send({averageRatting})
        }
        else{
            res.send({averageRatting})
            
        }
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
    console.log(data);

    let update = {}

    if (data?.likes) {
        update = {
            $set: {
                likes: data?.likes
            }
        }
    }
    if (data?.comments) {
        update = {
            $set: {
                comments: data?.comments
            }
        }
    }
    const options = { upsert: true }

    const result = await blogSchema.findByIdAndUpdate(id, update, options)
    console.log(result);
    res.send(result)

})


export default router