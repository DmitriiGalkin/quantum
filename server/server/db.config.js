'use strict';
const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host     : 'localhost', // специально для докера, иначе бы было написано localhost   db
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