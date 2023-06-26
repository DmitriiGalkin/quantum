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
User.update = function(userId, user, result){
    dbConn.query("UPDATE user SET title=?,points=?,email=?,password=?,token=?,image=? WHERE id = ?", [user.title,user.points,user.email,user.password,user.token, user.image, userId], function (err, res) {
        result(null, res);
    });
};
// Обновление токена
User.logi = function(token, email, result){
    dbConn.query("UPDATE user SET token=? WHERE email = ?", [token, email], function (err, res) {
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
        result(null, res.length ? res[0] : undefined);
    });
};
// function(callback) {
//     setTimeout(function() {
//         callback(null, 'one');
//     }, 200);
// }
// Участник
// User.findById = function (id) {
//     return new Promise((resolve, reject) => {
//         dbConn.query("Select * from user where id = ? ", id, function (err, res) {
//             if (err) reject(err)
//             else resolve(res);
//         });
//     })
//
// };
const parse = (res) => {
    return res //.map((r) => ({ ...r, avatar: JSON.parse(r.avatar)}))
}
// Участник по token
User.findByToken = function (id, result) {
    dbConn.query("Select * from user where token = ? ", id, function (err, res) {
        result(null, (res && res.length) ? parse(res)[0] : null);
    });
};
// Участники встречи
User.findByMeet = function (meet, result) {
    dbConn.query("Select * from user LEFT JOIN user_meet ON user.id = user_meet.userId where meetId = ?", meet.id, function (err, res) {
        result(null, parse(res));
    });
};
// Участники проекта
User.findByProject = function (project, result) {
    dbConn.query("Select * from user LEFT JOIN user_project ON user.id = user_project.userId where projectId = ?", project.id, function (err, res) {
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