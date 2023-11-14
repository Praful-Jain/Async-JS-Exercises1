const fs = require('fs').promises;
const path = require('path');
const generateRandomData = require('./randomData');

const directoryPath = '../output';
// Create JSON file
function createJSONFile(fileName){
    return new Promise( (resolve, reject) => {
        const data = generateRandomData();
        const filePath = path.join(directoryPath, fileName);
        
        fs.writeFile(filePath, JSON.stringify(data, null, 2))
            .then(() => {
                console.log(`${fileName} created successfully`);
                resolve(filePath);
            })
            .catch((err) => {
                console.error(`Error creating JSON file: ${err}`);
                reject(err);
            });
    });
}

// Delete JSON file
function deleteJSONFile(filePath){
    return new Promise( (resolve, reject) => {
        fs.unlink(filePath)
            .then(() => {
                console.log(`Deleted JSON file: ${filePath}`);
                resolve();      //resolve() without any argument, it resolves the promise with the value undefined
            })
            .catch((err) => {
                if (err.code === "ENOENT") {
                    console.error(`File path not found: ${filePath}`);
                    resolve(); // File not found is not treated as an error
                }
                else {
                    console.error(`Error deleting JSON file: ${err}`);
                    reject(err);
                }
            });
    });
}

function promiseWorking(){
    const fileNames = ['promisePart1.json', 'promisePart2.json', 'promisePart3.json'];
    const promises = [];        // it will store the file paths returned by the createJSONFile() funtcion

    createJSONFile(fileNames[0])
    .then((res1) => {
        promises.push(res1);
        return createJSONFile(fileNames[1]);
    })
    .then((res2) => {
        promises.push(res2);
        return createJSONFile(fileNames[2]);
    })
    .then((res3) => {
        promises.push(res3);
        // Promise.all takes this array of promises and returns a new promise that fulfills with an array of results when all the promises in the iterable have been fulfilled.
        return Promise.all(promises);        
    })
    .then( (filePaths) => {
        const deletePromises = filePaths.map( (file_path) => deleteJSONFile(file_path));
        return Promise.all(deletePromises);
    })
    .then(() => console.log('All files created and deleted successfully'))
    .catch((err) => {
        console.error(`An error occurred: ${err}`);      
    });
}

module.exports = promiseWorking;