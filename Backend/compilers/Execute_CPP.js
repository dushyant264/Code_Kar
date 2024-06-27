const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const writeInFile = require('../utils/writeInFile') // Adjust the import path as per your actual directory structure

const playGroundPath = path.join(__dirname, '../playground');

if (!fs.existsSync(playGroundPath)) {
    fs.mkdirSync(playGroundPath, { recursive: true });
}

const ExecuteCPP = async (filePath, inputData) => {
    const JobId = path.basename(filePath).split('.')[0];
    const outPath = path.join(playGroundPath, `${JobId}.out`);
    const inputPath = path.join(playGroundPath, `${JobId}.txt`);

    // Write inputData to inputPath using writeInFile function
    await writeInFile(playGroundPath, `${JobId}.txt`, inputData);

    // Construct command to compile and execute C++ program
    const command = `g++ ${filePath} -o ${outPath} && ${outPath} < ${inputPath}`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            } else {
                resolve(stdout);
            }
        });
    });
}

module.exports = ExecuteCPP;
