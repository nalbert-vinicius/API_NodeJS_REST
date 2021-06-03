const express = require('express');
const route = express.Router();
const mysql = require('../db').con;
/**
 * req = request
 * res = resposta
 * next = next
 */

// exemplo de GET
route.get('/', (req, res, next) =>{
    mysql.query(`SELECT 
	                pe.id_pedidos,
                    pe.quantidade,
                    pr.id_produtos,
                    pr.nome,
                    pr.preco
                FROM pedidos as pe 
                INNER JOIN produtos as pr 
                ON pr.id_produtos = pe.id_produtos;`,

    (err, result, field) =>{
        if(err){return res.status(500).send({msg: err})}
        const response = {
            quantidade: result.lenght,
            pedidos: result.map(pedido => {
                return {
                    id_pedido: pedido.id_pedidos,
                    quantidade: pedido.quantidade,
                    produto: {
                        id_produto: pedido.id_produtos,
                        nome: pedido.nome,
                        preco: pedido.preco
                        },
                    Request: {
                        tipo: 'GET',
                        descricao: '',
                        url: 'http://localhost:3000/pedidos/' + pedido.id_pedidos
                    }
                }
            })
        }
        return res.status(200).send(response)
    })
})

//exemplo post
route.post('/', (req, res, next) => {
    mysql.query('SELECT * FROM produtos WHERE id_produtos = ?',
    [req.body.id_produtos],
    (err, result, field) =>{
        if(err){return res.status(500).send({msg: err})}
        if(result == 0) {
            return res.status(404).send({
                msg: "Não existe produto com esse ID"
            })
        } 
        mysql.query('INSERT INTO pedidos (quantidade, id_produtos) VALUES (?,?)',
        [req.body.quantidade, req.body.id_produtos],
        (err, result, field) => {
            if(err){
               return res.status(500).send({
                   msg: err,
                   response: null
               }) 
            }
            const response = {
                msg: "Pedido criado com sucesso!",
                pedidoCriado: {
                    id_pedido: result.id_pedido,
                    quantidade: req.body.quantidade,
                },
                Request: {
                    tipo: 'POST',
                    descricao: '',
                    url: 'http://localhost:3000/pedidos/'
                }
            }
            res.status(201).send(response)
        }
    )
    })
})



//EXEMPLO DE GET COM ID
route.get('/:id_pedidos', (req, res, next) =>{
    mysql.query("SELECT * FROM pedidos WHERE id_pedidos = ?;",
    [req.params.id_pedidos],
    (err, result, field) =>{
        if(err){return res.status(500).send({msg: err})}
        if(result == 0) {
            return res.status(404).send({
                msg: "Não existe pedido com esse ID"
            })
        }
        const response = {
            pedidoCriado: {
                id_pedido: result[0].id_pedidos,
                id_produtos: result[0].id_produtos,
                quantidade: result[0].quantidade,
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

//exemplo delete
route.delete('/', (req, res, next) =>{
    mysql.query('DELETE FROM pedidos WHERE id_pedidos = ?',
    [req.body.id_pedidos],
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
    })
})



module.exports = route;