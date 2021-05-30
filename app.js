const express = require('express');
//instancia express
const app = express();
/**
 * req = request
 * res = resposta
 * next = next
 */
app.use((req, res, next)=> {
    res.status(200).send({
        mensagem: 'Ok, deu certo'
    });
}); 

module.exports = app;