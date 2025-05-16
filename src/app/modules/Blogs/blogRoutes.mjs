import express from 'express'
import blogSchema from './blogSchema.mjs';
import VerifyToken from '../../../Token/VerifyToken.mjs';
import userSchema from '../Users/userSchema.mjs';
const router = express.Router()

router.get("/blogs", async (req, res) => {
    const query = req.query.data
    console.log(query);

    if (query) {
        const filter = [{ name: { $regex: query, $options: "i" } }, { location: { $regex: query, $options: "i" } }]
        const result = await blogSchema.find().or(filter)
        res.send(result)
    }
    else {
        const result = await blogSchema.find()
        res.send(result)
    }

})


router.get('/my-blogs', VerifyToken, async (req, res) => {
    const email = req?.query.data
    const query = { email: email }
    if (req.user.email == email) {
        const result = await blogSchema.find(query)
        res.send(result)
    }
    else {
        res.send({ message: "User doesn't match" })
    }
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

router.get('/topRatting', async (req, res) => {
    const result = await blogSchema.find().exists("averageRatting").sort({ averageRatting: -1 })
    res.send(result)

})

router.get("/alllikes", async (req, res) => {
    const email = req.query
    const data = email?.data.split(',')
    const users = await userSchema.find()
    const result = users.filter(e => data?.includes(e.Email))
    res.send(result)
})



router.post("/blogs", async (req, res) => {
    const data = req.body
    const result = await blogSchema.insertMany(data)
    res.send(result)
})

router.patch(`/blogs/:id`, async (req, res) => {
    const id = req.params.id
    const data = req.body
    let update = {}
    if (data?.likes) {
        update = {
            $set: {
                likes: data?.likes
            }
        }
    }
    if (data?.comments) {
        const totalRatting = data?.comments?.reduce((a, b) => a + b.ratting, 0)
        const averageRatting = totalRatting / data?.comments?.length
        update = {
            $set: {
                comments: data?.comments,
                averageRatting: averageRatting
            }
        }
    }
    const options = { upsert: true }

    const result = await blogSchema.findByIdAndUpdate(id, update, options)
    res.send(result)

})

router.get("/mypost", async (req, res) => {
    const userEmail = req?.query.data
    const query = { email: userEmail }
    const result = await blogSchema.find(query)
    res.send(result)
})

router.get('/mypost/:email', async (req, res) => {
    const email = req.params.email
    const length = req.query.data
    const query = { email: email }
    const result = await blogSchema.find(query).limit(length)
    res.send(result)
})

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const result = await blogSchema.findByIdAndDelete(id)
    res.send(result)
})



export default router