const http = require("http");
const app = require("./app");


const server = http.createServer(app);
const PORT = 8000;



const startServer = ()=>{
    server.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}...`)
    });
}


startServer();