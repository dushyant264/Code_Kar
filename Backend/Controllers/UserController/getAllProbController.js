const Problem = require("../../models/ProblemModel")
const redisClient = require("../../config/RedisClient")
const User = require("../../models/UserModel")

const getAllProbController = async (req, res) => {
    try {
        const cachedProblems = await redisClient.get('all-problems')

        let problems
        if(cachedProblems){
            console.log('Problems found in cache')
            problems = JSON.parse(cachedProblems)
        }else{
            problems = await Problem.find({})
            if(!problems){
                return res.status(400).json({message:'Problems not found'})
            }
            await redisClient.setEx('all-problems',3600,JSON.stringify(problems))
            console.log('Problems added to cache')
        }
        const user = await User.findById(req.userId)
        // add solved or not solved action to each problem

        const problemsWithAction = problems.map((problem)=>({
            _id:problem._id,
            title:problem.title,
            difficulty:problem.difficulty,
            slug:problem.slug,
            action: user.solvedProblems.includes(problem._id) ? 'solved' : 'unsolved'
        }))

        res.status(200).json(problemsWithAction)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
}


module.exports = getAllProbController