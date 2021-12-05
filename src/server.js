'use strict';

const http = require('http');
const util = require('util');
const fs = require('fs');

http.createServer((req, res) =&gt; {
debugHeaders(req);

if (req.headers.accept &amp;&amp; req.headers.accept == 'text/event-stream') {
if (req.url == '/events') {
sendSSE(req, res);
} else {
res.writeHead(404);
res.end();
}
} else {
res.writeHead(200, {'Content-Type': 'text/html'});
res.write(fs.readFileSync(__dirname + '/index.html'));
res.end();
}
}).listen(8000);

const sendSSE = (req, res) =&gt; {
res.writeHead(200, {
'Content-Type': 'text/event-stream',
'Cache-Control': 'no-cache',
'Connection': 'keep-alive'
});

const id = (new Date()).toLocaleTimeString();

setInterval(() =&gt; {
constructSSE(res, id, (new Date()).toLocaleTimeString());
}, 5000);

constructSSE(res, id, (new Date()).toLocaleTimeString());
//res.end();
}

const constructSSE = (res, id, data) =&gt; {
res.write('id: ' + id + '\n');
res.write("data: " + data + '\n\n');
}

const debugHeaders = (req) =&gt; {
util.puts('URL: ' + req.url);
for (let key in req.headers) {
util.puts(key + ': ' + req.headers[key]);
}
util.puts('\n\n');
}