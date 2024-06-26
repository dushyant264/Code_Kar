const bcrypt = require('bcrypt')
const User = require('../../models/UserModel')

const SignUpController= async(req,res)=>{
    const {name, email, password,role,score}= req.body
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
        const user= new User({name,email,password:hashedPassword,role})
        await user.save()
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
}

module.exports= SignUpController