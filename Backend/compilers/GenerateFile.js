const path = require('path')
const fs = require('fs')
const {v4:uuid} = require('uuid')

const fileDir= path.join(__dirname,'../codes')

if(!fs.existsSync(fileDir)){
    fs.mkdirSync(fileDir,{recursive:true})
}

const GenerateFile=async (format,content)=>{
    const JobId= uuid()
    const fileName= `${JobId}.${format}`
    const filePath= path.join(fileDir,fileName)
    await fs.writeFileSync(filePath,content)
    return filePath
}

module.exports= GenerateFile