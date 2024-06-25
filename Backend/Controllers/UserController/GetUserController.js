const User = require('../../models/UserModel')

const GetUserController= async(req,res)=>{
    try {
        
        const user= await User.findById(req.userId)
        res.status(200).json(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:'Internal Server Error'})

    }
}

module.exports= GetUserController