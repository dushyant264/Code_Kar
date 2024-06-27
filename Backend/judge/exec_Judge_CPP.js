const {exec} = require('child_process')
const fs = require('fs')
const path = require('path')

const playGroundPath= path.join(__dirname,'../playground')

if(!fs.existsSync(playGroundPath)){
    fs.mkdirSync(playGroundPath,{recursive:true})
}

const exec_Judge_CPP= async (filePath,inputPath)=>{
    const JobId = path.basename(filePath).split('.')[0]
    const outPath = path.join(playGroundPath,`${JobId}.out`)

    const command = ` g++ ${filePath} -o ${outPath} && ${outPath} < ${inputPath}`

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

module.exports= exec_Judge_CPP