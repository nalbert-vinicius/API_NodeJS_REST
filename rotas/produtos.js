const express = require('express');
const route = express.Router();
const mysql = require('../db.js');

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
    var nome = req.body.nome;
    var preco = req.body.preco;
        mysql.query('INSERT INTO produtos (nome, preco) VALUES ('+nome+','+preco+')',
            //callback da query
            (error, result, field) =>{
                if(error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    msg: "Produto inserido com sucesso!",
                    id_produto: result.insertId
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