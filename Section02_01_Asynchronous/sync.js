const fs = require("fs");

console.log("1");

// reafileSync() blocks the execution of the code until the file is read
const res = fs.readFileSync('test.txt');
console.log("file: " + res);

// This will be printed after the file is read
console.log("2");