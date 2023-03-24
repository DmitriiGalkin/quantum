'use strict';
const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host     : 'db', // специально для докера, иначе бы было написано localhost
    user     : 'dima',
    password : 'dima1234',
    database : 'quantum',
    port: 3306,
});

dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = dbConn;