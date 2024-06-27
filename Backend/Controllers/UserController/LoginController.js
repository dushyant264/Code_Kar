const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')

const LoginController = async(req,res)=>{
    const { email, password } = req.body
    // check if user exists
    try {
        const user= await User.findOne({email})
        if(!user){
            return res.status(404).json({message:'User does not exist'})
        }
        // compare password
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:'Incorrect Password'})
        }
        // 30d expiry token
        const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'})
        res.status(200).json({token, user: {id:user._id, name:user.name, email:user.email,role:user.role}})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
}

module.exports= LoginController