const GenerateFile = require('../../compilers/GenerateFile')
const ExecuteCPP = require('../../compilers/Execute_CPP')
const ExecutePY = require('../../compilers/Execute_PY')

const RunCodeController= async (req,res)=>{
    try {
        const {lang, code, input} = req.body
        if(!code){
             res.status(400).json({message:'Code is required'})
            return
        }
        const filePath =await GenerateFile(lang, code)
        console.log(input)
        let userOutput
        if(lang==='cpp'){
            userOutput = await ExecuteCPP(filePath, input)
           
        }else if(lang==='py'){
             userOutput = await ExecutePY(filePath, input)
         } else{
            return res.status(400).json({message:'Invalid language'})
        }
        const lines = userOutput.split("\r\n").filter(line => line.trim() !== '');
        console.log(lines)
        res.status(200).json(userOutput)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports=RunCodeController