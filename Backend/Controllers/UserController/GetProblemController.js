const Problem = require('../../models/ProblemModel')
const redisClient = require('../../config/RedisClient')

const GetProblemController= async(req,res)=>{
    try {
        let slug = req.params.slug
        // try to find prob in cache
        const cachedProblem = await redisClient.get(`problem:${slug}`)
        let problem
        if(cachedProblem){
            console.log('Problem found in cache')
            problem = JSON.parse(cachedProblem)
        }else{
            problem = await Problem.findOne({slug})
            if(!problem){
                return res.status(400).json({message:'Problem not found'})
            }
            // fill prob cache
            await redisClient.setEx(`problem:${slug}`,3600,JSON.stringify(problem))
        }
        res.status(200).json(problem)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
}

module.exports= GetProblemController