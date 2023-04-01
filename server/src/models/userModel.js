'use strict';
var dbConn = require('../db');

var User = function(user){
    this.email = user.email;
    this.password = user.password;
    this.image = user.image;
    this.title = user.title;
    this.token = user.token;
    this.points = user.points;
};
// Создание участника
User.create = function (user, result) {
    dbConn.query("INSERT INTO user set ?", user, function (err, res) {
        result(null, res.insertId);
    });
};
// Обновление участника
User.update = function(id, user, result){
    dbConn.query("UPDATE user SET title=?,points=?,email=?,password=?,token=? WHERE id = ?", [user.title,user.points,user.email,user.password,user.token, id], function (err, res) {
        result(null, res);
    });
};
// Обновление токена
User.logi = function(token, result){
    dbConn.query("UPDATE user SET token=? WHERE id = 1", [token], function (err, res) {
        result(null, res);
    });
};

// Авторизация участника
User.islogin = function (email, password, result) {
    dbConn.query("Select * from user where email = ? AND password = ?", [email, password], function (err, res) {
        result(null, res);
    });
};
// Участник
User.findById = function (id, result) {
    dbConn.query("Select * from user where id = ? ", id, function (err, res) {
        result(null, res);
    });
};
// Участник по token
User.findByToken = function (id, result) {
    dbConn.query("Select * from user where token = ? ", id, function (err, res) {
        result(null, res.length ? res[0] : undefined);
    });
};
// Участники встречи
User.findByMeet = function (meet, result) {
    dbConn.query("Select * from user LEFT JOIN user_meet ON user.id = user_meet.userId where meetId = ?", meet.id, function (err, res) {
        result(null, res);
    });
};
// Участники проекта
User.findByProject = function (project, result) {
    dbConn.query("Select * from user LEFT JOIN user_project ON user.id = user_project.userId where projectId = ?", project.id, function (err, users) {
        result(null, users);
    });
};
// Начислеине баллов
User.userpoints = function (userId, points, result) {
    dbConn.query("UPDATE user SET points=? WHERE id = ?", [points, userId], function (err, res) {
        result(null, res);
    });
};


module.exports = User;