const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'db.json');

const readDataFromFile = () => {
    try {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data from db.json:', error);
        return[];
    }
};

const writeDataToFile = (data) => {
    try {
        fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Data written to db.json successfully.')
    } catch (error) {
        console.error('Error writing data to db.json:', error);
    }
};

module.exports = {
    readDataFromFile,
    writeDataToFile,
};
