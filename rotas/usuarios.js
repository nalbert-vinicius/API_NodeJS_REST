const express = require('express');
const route = express.Router();
const mysql = require('../db').con;
//biblioteca para criptografar senhas
const bcrypt = require('bcrypt');

route.post('/cadastro', (req, res, next) =>{

    mysql.query("SELECT * from usuarios where email = ?",
        [req.body.email],
        (err, result) =>{
            if(err) {return res.status(401).send({msg: err})}
            if(result.length > 0){
                res.status(409).send({msg: "usuário já cadastrado!"})
            }else{
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if(errBcrypt) {return res.status(500).send({err: errBcrypt})}
                    mysql.query("INSERT INTO usuarios (email, senha) VALUES (?,?)",
                    [req.body.email, hash],
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
                )
            }
    })    
})

module.exports = route;