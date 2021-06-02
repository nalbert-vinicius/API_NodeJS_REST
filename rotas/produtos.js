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
    mysql.query("SELECT * FROM produtos",
    (err, result, field) =>{
        if(err){return res.status(500).send({msg: err})}
        const response = {
            quantidade: result.lenght,
            produtos: result.map(prod => {
                return {
                    id_produto: prod.id_produtos,
                    nome: prod.nome,
                    preco: prod.preco,
                    Request: {
                        tipo: 'GET',
                        descricao: '',
                        url: 'http://localhost:3000/produtos/' + prod.id_produtos
                    }
                }
            })
        }
        return res.status(200).send(response)
    })
})

//exemplo de get
route.get('/:id_produto', (req, res, next) =>{
    mysql.query("SELECT * FROM produtos WHERE id_produtos = ?;",
    [req.params.id_produto],
    (err, result, field) =>{
        if(err){return res.status(500).send({msg: err})}
        if(result == 0) {
            return res.status(404).send({
                msg: "Não existe produto com esse ID"
            })
        }
        const response = {
            produtoCriado: {
                nome: result[0].nome,
                preco: result[0].preco,
                Request: {
                    tipo: 'GET/id',
                    descricao: '',
                    url: 'http://localhost:3000/produtos/'
                }
            }
        }

        return res.status(200).send(response)
    })
})

route.patch('/',(req, res, next) => {
    mysql.query('UPDATE produtos SET nome = ?, preco = ? WHERE id_produtos = ?',
    [req.body.nome, req.body.preco, req.body.id_produtos],
    (err, result, field) => {
        if(err){
           return res.status(500).send({
               msg: err,
               response: null
           }) 
        }
        //obj response
        const response = {
            produtoCriado: {
                nome: req.body.nome,
                preco: req.body.preco,
                Request: {
                    tipo: 'PATCH',
                    descricao: '',
                    url: 'http://localhost:3000/produtos/'
                }
            }
        }
        res.status(202).send(response)
    }
)   
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
            const response = {
                msg: "Produto criado com sucesso!",
                produtoCriado: {
                    id_produto: result.id_produto,
                    nome: req.body.nome,
                    preco: req.body.preco
                },
                Request: {
                    tipo: 'POST',
                    descricao: '',
                    url: 'http://localhost:3000/produtos/'
                }
            }
            res.status(201).send(response)
        }
    )
})

route.delete('/', (req, res, next) =>{
    mysql.query('DELETE FROM produtos WHERE id_produtos = ?',
    [req.body.id_produtos],
    (err, result, field) => {
        if(err){
           return res.status(500).send({
               msg: err,
               response: null
           }) 
        }
        res.status(202).send({
            msg: "Apagado com sucesso!",
            id: result.id
        })
    }
)   
})

module.exports = route;