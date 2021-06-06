// import metodos http
const http = require('http');
const app = require('./app');
//definindo a porta 
const port = 3000;
//criação do servidor
const server = http.createServer(app)
//escutar a porta
server.listen(port);