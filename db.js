var mysql = require('mysql2');
var connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password:'Apple@inc.99',
    database: 'papa'
});

connection.connect(function(err){
    if(err) throw err;
    console.log('unityAPI connected to database...');
});

module.exports = connection;