'use strict';
var dbConn = require('../db');

var Meet = function(data){
    this.id = data.id;
    this.x = data.x;
    this.y = data.y;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.datetime = data.datetime;
};
// Создание встречи
Meet.create = function (data, result) {
    //console.log(data,'data')
    dbConn.query("INSERT INTO meet set ?", data, function (err, res) {
        //console.log(err,'err')
        result(err, res.insertId);
    });
};
// Обновление встречи
Meet.update = function(id, meet, result){
    dbConn.query("UPDATE meet SET title=?, description=? WHERE id = ?", [meet.title, meet.description, id], function (err, res) {
        result(null, res);
    });
};
// Удаление встречи
Meet.delete = function(id, result){
    dbConn.query(`DELETE FROM meet WHERE id = ?`, id, function (err, res) {
        result(null, res);
    });
};
// Встречи
Meet.findAll = () => function (result) {
    dbConn.query("Select * from meet where DATE(datetime) >= CURDATE()", function (err, res) {
        result(null, res || []);
    });
};
// Встреча по номеру
Meet.findById = function (id, result) {
    dbConn.query("Select * from meet WHERE id = ?", id, function (err, res) {
        result(null, res[0]);
    });
};
// Встречи участника
Meet.findAllByUserId2 = (id) => function (result) {
    dbConn.query("SELECT * FROM user_meet WHERE userId = ?", id, function (err, res) {
        result(null, res);
    });
};
// Встречи участника
Meet.findAllByUserId = (id) => function (result) {
    dbConn.query("Select * from meet where DATE(datetime) >= CURDATE()", function (err, res) {
        //console.log(err,'err')
        result(null, res || []);
    });
};


module.exports = Meet;