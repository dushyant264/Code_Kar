const fs= require('fs')
const path = require('path')/

const writeInFile-,async(fileDir,fileName,content){
    const pathname= path.join(fileDir,fileName)
    await fs.writeFileSync(pathname,content)
    return pathname
}

module.exports= writeInFile