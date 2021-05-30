const express = require('express');
const rotaPedidos = require('./rotas/pedidos.js')
const rotaProdutos = require('./rotas/produtos.js')
const morgan = require('morgan')
//instancia express
const app = express();

//registra os logs da API
app.use(morgan('dev'))
//apontando o arquivo de rotas
app.use('/pedidos', rotaPedidos)
app.use('/produtos', rotaProdutos)

//quando não encontrar nenhuma das rotas entra aqui
app.use((req, res, next) => {
    const erro = new Error("Erro rota não encontrada");
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        msg: error.message
    })
});


module.exports = app;