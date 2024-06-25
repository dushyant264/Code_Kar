const Problem = require('../../models/ProblemModel')

const EditProblemController= async(req,res)=>{
    try {

        await Problem.findByIdAndUpdate({_id:req.params.id},req.body)
        res.status(200).json({message:'Problem updated successfully'})

    }
    catch (error) {

        res.status(500).json({message:'Internal Server Error',error})

    }
}

module.exports= EditProblemController