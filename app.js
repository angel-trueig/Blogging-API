// const http = require("http");

// const hostname ="127.0.0.1";
// const port = 3000;

// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{"content-type":"text/plain"});
//     res.end("Hello World");
// });

// server.listen(port,hostname,()=>{
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
// import { WebSocket } from "ws";

// // The first argument must be a URL string
// const socket = new WebSocket("ws://localhost:3000");

// socket.on("open", () => {
//   console.log("Connection established");
//   socket.send("Hello from client");
// });

// socket.on("message", (msg) => {
//   console.log("Message from server:", msg.toString());
// });

// socket.on("close", () => console.log("Connection closed"));

// socket.on("error", (err) => console.error("WebSocket error:", err.message));

// const readLine = require("readline");

// const r1 = readLine.createInterface({
//     input:process.stdin,
//     output:process.stdout,
// });

// r1.question("Enter your name:",(name)=>{
//     console.log(`hi ${name}`);
//     r1.close();
// })
// const {loadEnvFile} = require("process");

// loadEnvFile(".env");

// console.log(process.env.PORT);

// const { log } = require("console");
// const fs = require("fs");
// // try{

//     const stats = fs.statSync(".env");
//     console.log(stats);
// }catch(e){
//     console.error(err);
// }



// fs.stat(".env", (err,stats)=>{
//     if(err){
//         console.error(err);
//     }else{
//         console.log(stats);
//     }
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
//     console.log(stats.isSymbolicLink());
//     console.log(stats.size);

// })

// const fs= require("fs/promises");

// async function main(){
//     try{
//         const stats = await fs.stat(".env");
//         console.log(stats);
//     }catch(e){
//         console.error(e);
//     }
// }
// main();

// import fs from 'fs';
// import { pipeline } from 'node:stream/promises';
// import path from 'path';

// const fileUrl = 'https://www.gutenberg.org/files/2701/2701-0.txt';
// const outputFilePath = path.join(process.cwd(), 'moby.md');

// async function downloadFile(url, outputPath) {
//   const response = await fetch(url);

//   if (!response.ok || !response.body) {
//     // consuming the response body is mandatory: https://undici.nodejs.org/#/?id=garbage-collection
//     await response.body?.cancel();
//     throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
//   }

//   const fileStream = fs.createWriteStream(outputPath);
//   console.log(`Downloading file from ${url} to ${outputPath}`);

//   await pipeline(response.body, fileStream);
//   console.log('File downloaded successfully');
// }

// async function readFile(filePath) {
//   const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

//   try {
//     for await (const chunk of readStream) {
//       console.log('--- File chunk start ---');
//       console.log(chunk);
//       console.log('--- File chunk end ---');
//     }
//     console.log('Finished reading the file.');
//   } catch (error) {
//     console.error(`Error reading file: ${error.message}`);
//   }
// }

// try {
//   await downloadFile(fileUrl, outputFilePath);
//   await readFile(outputFilePath);
// } catch (error) {
//   console.error(`Error: ${error.message}`);
// }


const EventEmiitter = require("events");
const eventEmit = new EventEmiitter();

eventEmit.on("start" , ()=>{
    console.log("started");
    
})
eventEmit.emit("start");