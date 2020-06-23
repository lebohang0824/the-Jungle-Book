const fs = require('fs');
const book = '236-0.txt';

fs.readFile(book, 'utf8', (err, str) => {

    // Cast string to lower case
    str = cleanString(str);
    
    const words = splitString(str);
    
    let wordsObj = {};

    words.forEach(el => {
        // Do not count empty spaces.
        if (el.trim() == '') return;
        wordsObj.hasOwnProperty(el) ? wordsObj[el]++ : wordsObj[el] = 1;
    });

    let arrOfWords = [], count = 0;

    // Find the most used word
    for (const prop in wordsObj) {
        arrOfWords.push({
            name: prop, count: wordsObj[prop]
        })
    }

    // Sort array
    arrOfWords.sort((a, b) => {
        return b.count - a.count;
    });

    for (let i = 0; i < 5; i++) {
        fs.appendFile(`${arrOfWords[i].name}.txt`, writeContent(arrOfWords[i]), (err) => {
            if (err) throw err;
        });
    }
});

const splitString = str => {
    return str.split(/\s+/);
}

const cleanString = str => {
    const regex = /[.,"();*#\[\]?!@%_“$:”0-9‘]/g;
    return str.toLowerCase().replace(regex, '');
}

const writeContent = wordObj => {
    let str;
    console.log(wordObj)
    for (let i = 0; i < wordObj.count; i++) {
        str += `${wordObj.name} \n`;
    }
    return str;
}