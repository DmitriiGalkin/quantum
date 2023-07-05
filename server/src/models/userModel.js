'use strict';
var dbConn = require('../db');

var User = function(user){
    this.title = user.title;
    this.email = user.email;
    this.image = user.image;
    this.token = user.token;
};
// Создание участника
User.create = function (user, result) {
    dbConn.query("INSERT INTO user set ?", user, function (err, res) {
        result(null, res.insertId);
    });
};
// Обновление участника
User.update = function(userId, user, result){
    dbConn.query("UPDATE user SET title=?,image=? WHERE id = ?", [user.title, user.image, userId], function (err, res) {
        result(null, res);
    });
};
// Обновление токена
User.updateTokenById = function(token, id, result){
    dbConn.query("UPDATE user SET token=? WHERE id = ?", [token, id], function (err, res) {
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
User.findById = (id) => function (result) {
    dbConn.query("Select * from user where id = ? ", id, function (err, res) {
        result(null, res?.length ? res[0] : undefined);
    });
};

const parse = (res) => {
    return res
}
// Участник по token
User.findByToken = function (token, result) {
    console.log(token,'token')
    dbConn.query("Select * from user where token = ? ", token, function (err, res) {
        result(null, (res && res.length) ? parse(res)[0] : null);
    });
};
// Участники встречи
User.findByMeet = function (meet, result) {
    dbConn.query("Select * from user LEFT JOIN user_meet ON user.id = user_meet.userId where meetId = ?", meet.id, function (err, res) {
        result(null, parse(res));
    });
};
// Организатор
User.findByProjectOne = function (project, result) {
    dbConn.query("Select * from user where id = ?", project.userId, function (err, res) {
        result(null, (res && res.length) ? parse(res)[0] : null);
    });
};

// Участники сообщества
User.findByCommunity = function (community, result) {
    dbConn.query("Select * from user LEFT JOIN user_community ON user.id = user_community.userId where communityId = ?", community.id, function (err, res) {
        result(null, parse(res));
    });
};

// Начислеине баллов
User.userpoints = function (userId, points, result) {
    dbConn.query("UPDATE user SET points=? WHERE id = ?", [points, userId], function (err, res) {
        result(null, res);
    });
};


module.exports = User;