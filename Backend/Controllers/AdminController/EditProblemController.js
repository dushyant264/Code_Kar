const Problem = require('../../models/ProblemModel')
const redisClient = require('../../config/RedisClient')

const EditProblemController= async(req,res)=>{
    try {
        const problem= await Problem.findOne({_id:req.params.id})
        await Problem.findByIdAndUpdate({_id:req.params.id},req.body)
        // delete redis cache of problems
        await redisClient.del('all-problems')
        const deleted= await redisClient.del(`problem:${problem.slug}`) 
        console.log('Problem deleted from cache successfully',deleted)
        res.status(200).json({message:'Problem updated successfully'})

    }
    catch (error) {

        res.status(500).json({message:'Internal Server Error',error})

    }
}

module.exports= EditProblemController