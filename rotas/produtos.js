const express = require('express');
const route = express.Router();
const mysql = require('../db.js').con;


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

route.post('/', (req, res, next) => {
    mysql.query('INSERT INTO produtos (nome,preco) VALUES (?,?)',
        [req.body.nome, req.body.preco],
        (err, result, field) => {
            if(err){
               return res.status(500).send({
                   msg: err,
                   response: null
               }) 
            }
            res.status(201).send({
                msg: "Produto inserido com sucesso!",
                id: result.id
            })
        }
    )
})

route.delete('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: "Retorno do DELETE produtos",
        m: "Retorno outra mensagem"
    })
})

module.exports = route;