import jwt from 'jsonwebtoken'

const VerifyToken = async (req, res, next) => {
    const token = req?.cookies?.token
    if (!token) {
        return res.send({ message: "User doesn't  exist" })

        // return
    }
    jwt.verify(token, process.env.user_token, async (err, decoded) => {
        if (err) {
            return res.send({ message: "Unauthorize user" })
        }
        // console.log(decoded);
        else {
            req.user = decoded
            next()
        }
    })

}

export default VerifyToken