//PACOTES
const express = require('express');
const bodyParse = require('body-parser');
const morgan = require('morgan')

//ROTAS
const rotaPedidos = require('./rotas/pedidos.js')
const rotaProdutos = require('./rotas/produtos.js')

//instancia express
const app = express();

//registra os logs da API
//e passado como parametro o ambiente de 'DEV'
app.use(morgan('dev'))

//funções usadas para que as requisições aceite apenas formatos JSON no body
//PARSE
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Tratamento de CORS (quem e de onde a API pode ser acessada)
app.use((req, res, next) => {
    //controle de origin da requisição
    res.header('Access-Control-Allow-Origin', '*');
    
    //controle do header
    res.header('Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    //metodos de retorno
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})

//apontando o arquivo de rotas
app.use('/pedidos', rotaPedidos)
app.use('/produtos', rotaProdutos)

//quando não encontrar nenhuma das rotas entra aqui
app.use((req, res, next) => {
    const erro = new Error("Erro rota não encontrada");
    erro.status = 404;
    next(erro);
})
//retorno do erro
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        msg: error.message
    })
});


module.exports = app;