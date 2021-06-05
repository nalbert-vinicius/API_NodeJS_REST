const express = require('express');
const route = express.Router();
const mysql = require('../db').con;
//biblioteca para criptografar senhas
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

route.post('/cadastro', (req, res, next) =>{

    mysql.query("SELECT * from usuarios where email = ?",
        [req.body.email],
        (err, result) =>{
            if(err) {return res.status(401).send({msg: err})}
            if(result.length > 0){
                res.status(409).send({msg: "usuário já cadastrado!"})
            }else{
                mysql.query("INSERT INTO usuarios (email, senha) VALUES (?,?)",
                    [req.body.email, req.body.senha],
                    (error, result) =>{
                        if(error){
                            return res.status(500).send({
                                err: error
                            })
                        }
                        const response ={
                            msg: "Usuário criado com sucesso!",
                            id_usuario: result.insertId,
                            objUsuario: {
                                email: req.body.email
                            }
                        } 
                        return res.status(201).send(response);
                        })
                    }
    })  
})

route.post('/login', (req, res, next) => {
    mysql.query("SELECT * FROM usuarios WHERE email = ?",
        [req.body.email],
        (err, result) => {
            if(result.length <1){
                return res.status(401).send({msg: "Falha na autenticação"})
            }
            if(req.body.senha === result[0].senha){
                //para criar um token é necessário usar função sing
                //(Payload, chave da API, options, callback)
                let token = jwt.sign({
                    id_usuario: result[0].id_usuario,
                    email: result[0].email
                }, process.env.JWT_KEY,
                    {expiresIn: "1h"
                });
                return res.status(200).send({
                    msg: "Autenticado com sucesso!",
                    token: token
                })
            }else{
                return res.status(401).send({msg: "Falaha na autenticação"})
            }
        })
})

module.exports = route;