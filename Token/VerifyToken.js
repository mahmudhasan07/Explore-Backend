import jwt from 'jsonwebtoken'

const VerifyToken = async (req, res, next) => {
    const token = req?.cookies?.token
    console.log(token);
    if (!token) {
        res.send({ message: "Unauthorize User" })
    }
    jwt.verify(token, process.env.user_token, async (err, decoded) => {
        if (err) {
            res.send({ message: "Invalid Token" })
        }
        // console.log(decoded);
        else{
            req.user = decoded
            next()
        }
    })

}

export default VerifyToken