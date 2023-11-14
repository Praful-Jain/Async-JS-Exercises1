function generateRandomData()
{
    const data = {
        name: randomNames(),
        age: randomAge(10,20),
        gender: randomGender()
    }
    return data;
}

const randomNames = () => {
    const names = ['John', 'Alice', 'Bob', 'Eva', 'David', 'Sophie'];
    const index = Math.floor(Math.random() * names.length);
    return names[index];
}

const randomAge = (min,max) => {
    const range = max-min+1;
    const age = Math.floor(Math.random() * range) + min;
    return age;
}

const randomGender = () => {
    const r = Math.random();
    if(r<.5){
        return 'Male';  
    } else{
        return 'Female';
    }
}

module.exports = generateRandomData;