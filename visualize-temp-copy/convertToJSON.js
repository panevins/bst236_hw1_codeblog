const fs = require('fs');
const path = require('path');

// Define the input and output file paths
const inputFilePath = path.join(__dirname, 'measuretest.txt');
const outputFilePath = path.join(__dirname, 'measuretest.json');

// Read the input file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Split the data into rows and process each row
    const rows = data.split('\n').filter(row => row.trim() !== '');
    const jsonData = rows.map(row => {
        const [city, temperature] = row.split(';');
        return {
            city: city.trim(),
            temperature: parseFloat(temperature.trim())
        };
    });

    // Write the JSON data to the output file
    fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) {
            console.error('Error writing the JSON file:', err);
            return;
        }
        console.log('JSON file has been saved.');
    });
});