'use strict';
const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'dima',
    password : 'dima1234',
    database : 'quantum',
});

dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Server connected database on port 3306");
});

dbConn.query(`SET time_zone='+00:00'`, function (err, res) {
    console.log(err, res);
});

module.exports = dbConn;