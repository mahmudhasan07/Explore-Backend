import userSchema from "./userSchema.mjs";

const route = express.Router()


route.get('/users/:email', async (req, res) => {
    const email = req.params.email
    console.log(email);

    const query = { Email: email }
    const result = await userSchema.findOne(query)
    res.send(result)
})

route.get('/users', async (req, res) => {
    const email = req.query
    const result = await userSchema.find().populate('Followings').populate('Followers')
    
    if (email?.data) {
        const profile = result.filter(e => e.Email.includes(email.data))
        res.send(...profile)    
    }
    else {
        res.send(result)
    }
})

route.post("/users", async (req, res) => {
    const data = req.body
    const result = await userSchema.insertMany(data)
    res.send(result)
})

route.patch('/following/:id', async (req, res) => {
    const followingId = req.params.id
    const followerId = req.body.idx

    const query1 = { _id: followingId }
    const query2 = { _id: followerId }
    const options = {
        upsert: true
    }
    const followingUpdateDoc = {
        $push: {
            Followings: followerId
        }
    }

    const followerUpdateDoc = {
        $push: {
            Followers: followingId
        }
    }

    const followingResult = await userSchema.updateOne(query1, followingUpdateDoc, options)
    const followerResult = await userSchema.updateOne(query2, followerUpdateDoc, options)

    if (followerResult && followingResult) {
        res.send({ followerResult, followingResult })
    }
})


route.patch('/unfollow/:id', async(req,res)=>{
    const unFollowingId = req.params.id
    const unFollowerId = req.body.idx
const unFollowingResult = await userSchema.findById(unFollowingId)
const unFollowerResult = await userSchema.findById(unFollowerId) 

const Following = unFollowingResult?.Followings.filter(e=> e!=unFollowerId)
const Follower = unFollowerResult?.Followers.filter(e=> e!=unFollowingId)
console.log(Following, Follower);


    const query1 = { _id: unFollowingId }
    const query2 = { _id: unFollowerId }
    const options = {
        upsert: true
    }

    const followingUpdateDoc = {
        $set: {
            Followings: Following
        }
    }

    const followerUpdateDoc = {
        $set: {
            Followers: Follower
        }
    }

    const followingResult = await userSchema.updateOne(query1, followingUpdateDoc, options)
    const followerResult = await userSchema.updateOne(query2, followerUpdateDoc, options)

    if (followerResult && followingResult) {
        res.send({ followerResult, followingResult })
    }
    // const unfollow 


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