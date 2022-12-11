const http = require("http");
const port = process.env.port || 5000;

let server = http.createServer((request, response)=>{

    response.writeHead(200, "Success", {"Content-Type": "text/html"});

    response.end(`<h1 style="text-align:center;color: red">This is html response</h1>`);

})

server.listen(port, ()=>{
    console.log("App is running at "+port)
});