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
        mensagem: "Retorno Produtos metodo GET"
    })
})

//exemplo de POST
route.post('/:parametro', (req, res, next) =>{
    var param = req.params.parametro;
    if(param === "produto"){
        res.status(200).send({
            mensagem: param,
            msg: "parametro produto recebido com sucesso!"
        })
    }else{
        res.status(200).send({
            mensagem: "Retorno metodo POST de produtos sem parametro"
        })
    }
})

route.delete('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: "Retorno do DELETE produtos",
        m: "Retorno outra mensagem"
    })
})

module.exports = route;