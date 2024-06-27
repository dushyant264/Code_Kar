const User = require('../../models/UserModel')
const Problem = require('../../models/ProblemModel')
const path = require('path')
const GenerateFile = require('../../compilers/GenerateFile')
const exec_Judge_PY = require('../../judge/exec_Judge_PY')
const exec_Judge_CPP = require('../../judge/exec_Judge_CPP')
const redisClient = require('../../config/RedisClient')

const checkProblemController = async (req, res) => {
    try {
        let slug = req.params.slug
        // try to find prob in cache
        let cachedProblem = await redisClient.get(`problem:${slug}`)
        let problem
        if (cachedProblem) {
            console.log('Problem found in cache')
            problem = JSON.parse(cachedProblem)
        } else {
            problem = await Problem.findOne({slug})
            if (!problem) {
                 res.status(400).json({message: 'Problem not found'})
                 return
            }
            await redisClient.setEx(`problem:${slug}`, 3600, JSON.stringify(problem))
        }

        const {lang, code} = req.body
        if(!code){
             res.status(400).json({message:'Code is required'})
             return
        }

        const filePath =await  GenerateFile(lang, code)
        const inputPath = `${path.join(__dirname, '../../inputs')}/${slug}.txt`
        let userOutput
        if (lang === 'cpp') {
            userOutput = await exec_Judge_CPP(filePath, inputPath)
        } else if (lang === 'py') {
            userOutput = await exec_Judge_PY(filePath, inputPath)
        }
        userOutput = userOutput.trim()
        console.log('User Output:', userOutput);
        console.log('Expected Output:', problem.output);
        function compareOutputs(userOutput, expectedOutput) {
            const userLines = userOutput.trim().split('\n');
            const expectedLines = expectedOutput.trim().split('\n');
        
            if (userLines.length !== expectedLines.length) {
                return false;
            }
        
            for (let i = 0; i < userLines.length; i++) {
                if (userLines[i].trim() !== expectedLines[i].trim()) {
                    return false;
                }
            }
        
            return true;
        }
        if (compareOutputs(userOutput, problem.output)) {
            let addScore
            if (problem.difficulty === 'easy') {
                addScore = 10
            } else if (problem.difficulty === 'medium') {
                addScore = 20
            } else {
                addScore = 40
            }

           const user = await User.findById(req.userId)
            if(!user.solvedProblems.includes(problem._id)){
              user.solvedProblems.push(problem._id)
              user.score += addScore
              await user.save()
            }
            res.status(200).json('All test cases passed')
        }else{
            res.status(400).json('Wrong Answer')
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = checkProblemController