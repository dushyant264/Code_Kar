const bcrypt = require('bcrypt')
const User = require('../../models/UserModel')

const SignUpController= async(req,res)=>{
    const {name, email, password}= req.body
    try {
        // user already
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message:'User already exists'})
        }
         // hash password
        const salt= await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)
        // save user
        const user= new User({name,email,password:hashedPassword})
        await user.save()
        res.json('success')
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
}

module.exports= SignUpController