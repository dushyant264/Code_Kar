const Problem = require('../../models/ProblemModel')
const redisClient = require('../../config/RedisClient')

const AddProblemController= async(req,res)=>{
    try {

        let problem = new Problem({...req.body,slug:'a'})
        await problem.save()

        // update redis cache of problems

        const cachedProblems = await redisClient.get('all-problems')
        if(cachedProblems){
            const problems = JSON.parse(cachedProblems)
            problems.push(problem)
            await redisClient.setEx('all-problems',3600,JSON.stringify(problems))
        }
        // add problem to cache

        await redisClient.setEx(`problem:${problem.slug}`,3600,JSON.stringify(problem))

        res.status(201).json({message:'Problem added successfully'})

    } catch (error) {

        res.status(500).json({message:'Internal Server Error',error})

    }
}

module.exports= AddProblemController