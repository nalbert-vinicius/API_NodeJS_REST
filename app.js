const express = require('express');
const rotaPedidos = require('./rotas/pedidos.js')
const rotaProdutos = require('./rotas/produtos.js')
//instancia express
const app = express();
/**
 * req = request
 * res = resposta
 * next = next
 */

//apontando o arquivo de rotas
app.use('/pedidos', rotaPedidos)
app.use('/produtos', rotaProdutos)


module.exports = app;