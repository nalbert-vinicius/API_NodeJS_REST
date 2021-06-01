const mysql = require('mysql');

//criação da conexão com o Banco de dados
var pool = mysql.createPool({
    //process.env.
    //são variaveis de ambiente configuradas no nodemon
    "host" : process.env.MYSQL_HOST,
    "port" : process.env.MYSQL_PORT,
    "user" : process.env.MYSQL_USER,
    "password" : process.env.MYSQL_PASSWORD,
    "database" : process.env.MYSQL_DATABASE,
    insecureAuth : true
});

module.exports = pool;