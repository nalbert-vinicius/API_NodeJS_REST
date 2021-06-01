const mysql = require('mysql');
//criação da conexão com o Banco de dados
var con = mysql.createConnection({
    //process.env.
    //são variaveis de ambiente configuradas no nodemon
    "user" : process.env.MYSQL_USER,
    "password" : process.env.MYSQL_PASSWORD,
    "database" : process.env.MYSQL_DATABASE,
    "host" : process.env.MYSQL_HOST,
    "port" : process.env.MYSQL_PORT
});
con.connect((err) => {
    if(!err){
        console.log("Conectado com sucesso!");
    }else{
        console.log("A conexão falhou!")
    }
})
exports.con = con;
