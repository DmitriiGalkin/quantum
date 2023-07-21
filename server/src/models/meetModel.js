'use strict';
var dbConn = require('../db');

var Meet = function(data){
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.datetime = data.datetime;
    this.userId = data.userId; // Создатель встречи
    this.latitude = data.latitude;
    this.longitude = data.longitude;
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
    console.log(meet,'meet update')
    dbConn.query("UPDATE meet SET title=?, description=?, datetime=?, image=?, latitude=?, longitude=? WHERE id = ?", [meet.title, meet.description, meet.datetime, meet.image, meet.latitude, meet.longitude, id], function (err, res) {
        console.log(res,'res')
        console.log(err,'err')

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
const RADIUS = 100000 // Количество метров между мной и местом встречи TODO: сократить радиус с ростом аудитории
Meet.findAll = () => function (result) {
    dbConn.query("SELECT *, date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime from meet " +
        "WHERE DATE(datetime) >= CURDATE() " +
        //"AND ST_Distance_Sphere(point(" + x + ", " + y + "), point(x, y)) < " + RADIUS + " " +
        "ORDER BY datetime", function (err, res) {
        result(null, res || []);
    });
};
// Встреча по номеру
Meet.findById = function (id, result) {
    dbConn.query("SELECT *, date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime from meet WHERE id = ?", id, function (err, res) {
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
Meet.findAllByUserId = () => function (result) {
    dbConn.query("SELECT *, date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime from meet where DATE(datetime) >= CURDATE() ORDER BY datetime", function (err, res) {
        //console.log(err,'err')
        result(null, res || []);
    });
};
// Встречи на которые пользователь принимает участие
Meet.findUserMeet = function(userId, result){
    dbConn.query("SELECT *, date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime FROM meet LEFT JOIN user_meet ON user_meet.meetId = meet.id WHERE user_meet.userId = ? ORDER BY datetime DESC", [userId], function (err, res) {
        result(null, res.length ? res : undefined);
    });
};


module.exports = Meet;