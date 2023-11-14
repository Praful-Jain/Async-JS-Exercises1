const fs = require('fs');

async function readFile(fileName){
    // 'readFile()' method is asynchronous and returns a Promise that fulfills when the read operation is complete.
    const data = await fs.promises.readFile(fileName, "utf-8");
    return data;
}

async function writeFile(fileName, data){
    // 'writeFile()' method is asynchronous and returns a Promise that fulfills when the write operation is complete.
    await fs.promises.writeFile(fileName, data, "utf-8");
}

async function appendFile(fileName, data){
    await fs.promises.appendFile(fileName, data, 'utf-8');
}

async function deleteFile(fileName){
    await fs.promises.unlink(fileName);
}


async function main()
{
    const lipsumData = await readFile('lipsum.txt');        // read 'lipsum.txt' file's data
    
    // Convert the contents of the file lipsum.txt to uppercase
    const upperCasedData = lipsumData.toUpperCase();

    // Write the uppercase content to a new file called uppercase.txt. 
    await writeFile('uppercase.txt', upperCasedData);

    // Store the name of the new file in filenames.txt
    await writeFile('filenames.txt', 'uppercase.txt\n');
    
    // Read the new file and convert it to lower case.
    const data = await readFile('uppercase.txt');
    const lowerCasedData = data.toLowerCase();

    // Then split the contents into sentences.
    const arrSentences = lowerCasedData.split(`. `);
    
    // write each sentence into separate new files.
    for(const sentence of arrSentences)
    {
        const fileName = `sentence-${arrSentences.indexOf(sentence)+1}.txt`;
        await writeFile(fileName,sentence);
        await appendFile('filenames.txt', `${fileName}\n`);     // Store the name of the new files in filenames.txt
    }

    // Read the contents of filenames.txt 
    const fileNames = (await readFile('filenames.txt')).split('\n');
 
    // traverse fileNames
    for(const name of fileNames)
    {
        if(name == '')  break;
    
        const data = await readFile(name);              // read content of file
        const arrWords = data.split(' ');               // convert string to array of words
        arrWords.sort();                                // sort the array of words
        const line = arrWords.join(' ');                // convert the sorted array of words back into a string
        await appendFile('sorted.txt',`${line}\n\n`);     // store the sorted string into 'sorted.txt' file
    }
    await appendFile('filenames.txt', 'sorted.txt');

    // Read the contents of filenames.txt and delete all the new files that are mentioned in that list concurrently
    for(const name of fileNames)
    {
        if(name){
            await deleteFile(name);
        }
    }
    await deleteFile('sorted.txt');
}

module.exports = main;