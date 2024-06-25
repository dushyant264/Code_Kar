const User = require('../../models/UserModel')

const LeaderboardController= async(req,res)=>{
    try {
        const leaderboard= await User.find({},'name score').sort({score:-1}).lean()

        const rankedLeaderboard= leaderboard.map((user,index)=>({
            ...user,
            rank:index+1
        }))

        res.status(200).json(rankedLeaderboard)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
}

module.exports=LeaderboardController