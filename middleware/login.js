const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    //metodo para verificar o token com a key do servidor
    //deve ser chamado como parametro na rota
    try{
        //envia o token via header
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const decod = jwt.verify(token, process.env.JWT_KEY,);
        req.usuario = decod;
        next();
    }catch(error){
        return res.status(401).send({msg: "Falha na autenticação JWT!"});
    }
}