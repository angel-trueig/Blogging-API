const fs = require("node:fs/promises");
const path = require("path");

const dbpath = path.join(__dirname, "../db.json");


const readDB = async () => {
    let data = await fs.readFile(dbpath, "utf-8")
    // console.log(data);
    return JSON.parse(data);
}

const writeDB = (data) => {
    fs.writeFile(dbpath, JSON.stringify(data));
}

module.exports = { readDB, writeDB };