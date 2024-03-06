const fs = require("fs");

console.log("1");

// readFile() does not block the execution of the code
const res = fs.readFile('test.txt', (err, data) => console.log("file: " + data.toString()));

// This will be printed before the file is read
console.log("2");