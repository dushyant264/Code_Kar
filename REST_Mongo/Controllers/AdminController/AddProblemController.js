const Problem = require('../../models/ProblemModel')

const AddProblemController= async(req,res)=>{
    try {

        let problem = new Problem({...req.body,slug:'a'})
        await problem.save()
        res.status(201).json({message:'Problem added successfully'})

    } catch (error) {

        res.status(500).json({message:'Internal Server Error',error})

    }
}

module.exports= AddProblemController