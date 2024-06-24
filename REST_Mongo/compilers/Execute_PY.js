const {exec} = require('child_process')
const fs = require('fs')
const path = require('path')

const playGroundPath= path.join(__dirname,'../playground')

if(!fs.existsSync(playGroundPath)){
    fs.mkdirSync(playGroundPath,{recursive:true})
}

const ExecutePY= async (filePath,inputData)=>{
    const JobId = path.basename(filePath).split('.')[0]
    const outPath = path.join(playGroundPath,`${JobId}.out`)
    const inputPath = path.join(playGroundPath,`${JobId}.txt`)

    const command = ` touch ${inputPath} && echo "${inputData}" > ${inputPath} && python ${filepath} < ${inputPath}`

    return new Promise((resolve,reject)=>{
       exec(
              command,
              (error,stdout,stderr)=>{
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout)
              }
       )
    
    })
}

module.exports= ExecutePY