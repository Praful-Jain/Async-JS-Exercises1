const fs = require('fs').promises;
const path = require('path');
const generateRandomData = require('./randomData');

const directoryPath = '../output';
// Create JSON file
async function createJSONFile(fileName){
    try{
        const data = generateRandomData();
        const filePath = path.join(directoryPath, fileName);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
        console.log(`${fileName} created successfully`);
        return filePath;
    }
    catch(err){
        console.error(`Error creating JSON file: ${err}`);
        throw err;
    }
}

// Delete JSON file
async function deleteJSONFile(filePath) {
    try{
        await fs.unlink(filePath);
        console.log(`Deleted JSON file: ${filePath}`);
    }
    catch(err){
        if (err.code === "ENOENT") {
            console.error(`File not found: ${filePath}`);
        }
        else {
            console.error(`Error deleting JSON file: ${err}`);
            throw err;
        }
    }
}

async function asyncWorking(){
    const fileNames = ['asyncPart1.json', 'asyncPart2.json', 'asyncPart3.json'];
    
    try{
        // Promise.all waits for all the promises to resolve. The result, stored in filePaths, is an array of the fulfilled values
        const filePaths = await Promise.all(fileNames.map((file_name) => createJSONFile(file_name)));
        const deleted = await Promise.all(filePaths.map((file_path) => deleteJSONFile(file_path)));

        console.log('All files created and deleted successfully');
    }
    catch(err){
        console.error(`An error occurred: ${err}`);
    }
}

module.exports = asyncWorking;