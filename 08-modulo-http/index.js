const http = require('http');

http.createServer((req, res) => {
  res.end('Hello node!!!');
}).listen(5000, () => console.log('O servidor está rodando!'));
