const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(fs.readFileSync('intersection-observer.html','utf8'));
	res.end();
}).listen(8080);