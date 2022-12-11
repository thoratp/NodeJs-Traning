var http = require('http');
var fs = require('fs');
var url = require('url');

const port = process.env.port || 9000;

var server = http.createServer(function (req, res) {
    if (req.method === "GET" && req.url == "/add") {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("./public/add.html", "UTF-8").pipe(res);
    } else if (req.method === "POST" && req.url == "/add") {
        var body = '';
        req.on("data", function (chunk) {
            body += chunk
        });

        req.on("end", function () {

            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            var myUrl = new URL(`http://localhost:9000/add?${body}`)
            var n1 = parseInt(myUrl.searchParams.get('number1'))
            var n2 = parseInt(myUrl.searchParams.get('number2'))
            res.write(fs.readFileSync("./public/add.html"));
            res.write(`<h1> result is : ${n1 + n2}</h1>`)
            res.end('')
        });
    } else {
        res.end("This is error")
    }
})

server.listen(port, () => {
    console.log("App is running at " + port)
});