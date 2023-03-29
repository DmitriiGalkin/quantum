'use strict';
var dbConn = require('../db.config');

var User = function(user){
    this.email = user.email;
    this.password = user.password;
    this.image = user.image;
    this.title = user.title;
    this.token = user.token;
    this.points = user.points;
    this.created_at = new Date();
    this.updated_at = new Date();
};
User.create = function (user, result) {
    dbConn.query("INSERT INTO user set ?", user, function (err, res) {
        if (err) result(err, null);
        result(null, res.insertId);
    });
};

User.islogin = function (email, password, result) {
    dbConn.query("Select * from user where email = ? AND password = ?", [email, password], function (err, res) {
        if(err) result(err, null);
        result(null, res);
    });
};
User.findById = function (id, result) {
    dbConn.query("Select * from user where id = ? ", id, function (err, res) {
        if(err) result(err, null);
        result(null, res);
    });
};
User.findByToken = function (id, result) {
    dbConn.query("Select * from user where token = ? ", id, function (err, res) {
        if(err) result(err, null);
        result(null, res.length ? res[0] : undefined);
    });
};
User.findUniquesById = function (id, result) {
    dbConn.query("Select * from `user_unique` where userId = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

User.findByProjectMeet = function (project, result) {
    dbConn.query("Select * from user LEFT JOIN user_meet ON user.id = user_meet.userId where meetId = ? ORDER BY user_meet.created_at DESC", meet.id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, { ...meet, users: res});
        }
    });
};
User.findByMeet = function (meet, result) {
    dbConn.query("Select * from user LEFT JOIN user_meet ON user.id = user_meet.userId where meetId = ? ORDER BY user_meet.created_at DESC", meet.id, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, { ...meet, users: res});
        }
    });
};
User.findByProject = function (project, result) {
    dbConn.query("Select * from user LEFT JOIN user_project ON user.id = user_project.userId where projectId = ?", project.id, function (err, users) {
        if(err) result(err, null);
        result(null, { ...project, users });
    });
};
User.findByMeetId = function (id, result) {
    dbConn.query("Select * from user LEFT JOIN user_meet ON user.id = user_meet.userId where meetId = ? ORDER BY user_meet.created_at DESC", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
User.findByProjectId = function (id, result) {
    dbConn.query("Select * from user LEFT JOIN user_project ON user.id = user_project.userId where projectId = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
User.findByPlaceId = function (id, result) {
    dbConn.query("Select * from user LEFT JOIN user_place ON user.id = user_place.userId where placeId = ? ", id, function (err, res) {
        if (err) result(err, null);
        result(null, res);
    });
};



User.findAll = function (result) {
    dbConn.query("Select * from user", function (err, res) {
        if(err) result(null, err);
        result(null, res);
    });
};
User.update = function(id, user, result){
    dbConn.query("UPDATE user SET title=?,points=?,email=?,password=?,token=? WHERE id = ?", [user.title,user.points,user.email,user.password,user.token, id], function (err, res) {
        if(err) result(null, err);
        result(null, res);
    });
};
User.logi = function(token, result){
    dbConn.query("UPDATE user SET token=? WHERE id = 1", [token], function (err, res) {
        if(err) result(null, err);
        result(null, res);
    });
};

User.delete = function(id, result){
    dbConn.query("DELETE FROM user WHERE id = ?", [id], function (err, res) {
        if(err) result(null, err);
        result(null, res);
    });
};
module.exports = User;