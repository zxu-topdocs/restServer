const http = require('http');
const app = require('./app');
const port = process.env.port || 3000;
const server = http.createServer(app);

// server.on('connection',()=>{
//     console.log("new connection");
// })
server.listen(port,()=> console.log(`listen on port ${port}...`));
