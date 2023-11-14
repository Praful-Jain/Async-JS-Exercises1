const fs = require('fs');
const path = require('path');
const generateRandomData = require('./randomData');

const directoryPath = '../output';
// Create JSON file
function createJSONFile(fileName, callback){
    const data = generateRandomData();
    const filePath = path.join(directoryPath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          callback(err);
        } 
        else {
            callback(null);
        }
    });
    console.log(`${fileName} created successfully`);
}

// Delete JSON file
async function deleteJSONFile(fileName,callback) {
    const filePath = path.join(directoryPath, fileName);
    fs.unlink(filePath, (err) => {
        if (err) {
          callback(err);
        } 
        else {
          console.log(`Deleted JSON file: ${fileName}`);
          callback(null);
        }
    });
}


function callbackWorking(){
    const fileNames = ['callbackPart1.json', 'callbackPart2.json', 'callbackPart3.json'];
  
    // Create three random JSON files
    fileNames.forEach((file_name) => {
        createJSONFile(file_name, (err) => {
            if (err) {
                console.error(`Error creating JSON file: ${err}`);
            }
        });
    });

    // Delete the JSON files concurrently
    fileNames.forEach((file_name) => {
        deleteJSONFile(file_name, (err) => {
            if (err) {
                console.error(`Error deleting JSON file: ${err}`);
            }
        });
    });
}

module.exports = callbackWorking;