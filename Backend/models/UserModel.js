const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    name: { type:String },
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    score: { type:Number, default:0 },
    role: { type:String, default:'user', enum:['user', 'admin'] },
    solvedProblems: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Problem'}]
})

const User= mongoose.model('User',UserSchema)

module.exports= User