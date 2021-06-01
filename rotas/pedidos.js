const express = require('express');
const route = express.Router();
/**
 * req = request
 * res = resposta
 * next = next
 */

// exemplo de GET
route.get('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: "Retorno metodo GET"
    })
})

//exemplo de POST
route.post('/:parametro', (req, res, next) =>{
    var param = req.params.parametro;
    if(param === "testeREQ"){
        res.status(200).send({
            mensagem: param,
            msg: "parametro recebido com sucesso!"
        })
    }else{
        res.status(200).send({
            mensagem: "Retorno metodo POST sem parametro"
        })
    }
})

//exemplo delete
route.delete('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: "Retorno do DELETE",
        m: "Retorno outra mensagem"
    })
})

//exemplo bodyParse
route.post('/', (req, res, next) => {
    const pedido = {
        produto: req.body.produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        msg: "Inserido com sucesso!",
        pedidoCriado: pedido
    })
})

module.exports = route;