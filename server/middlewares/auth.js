import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) => {    // decode jwt token to get clerkId
    
    try {                    
        const {token} = req.headers

        if(!token){
            return res.json({success:false, message:'Not Authorized Login Again'})
        }
        const token_decode = jwt.decode(token)
        req.body.clerkId = token_decode.clerkId
        next()

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

export default authUser