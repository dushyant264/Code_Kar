const User = require('../models/UserModel')

const checkAdmin = async (req, res, next) => {
    try {
        // check if user exists n is admin
        const user = await User.findById(req.userId)
        if (!user) {
             res.status(404).json({ message: 'User does not exist' })
        }
        else if(user.role !== 'admin'){
             res.status(403).json({message:'Unauthorized'})
        }
        else {
            next()
        }
    }
        catch(error){
            console.log(error.message)
            res.status(500).json({message:'Internal Server Error'})
        }
}

module.exports = checkAdmin