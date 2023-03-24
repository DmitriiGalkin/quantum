'use strict';
var dbConn = require('../db.config');

var User = function(user){
    this.email = user.email;
    this.password = user.password;
    this.image = user.image;
    this.title = user.title;
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
User.findUniquesById = function (id, result) {
    dbConn.query("Select * from `unique` where userId = ? ", id, function (err, res) {
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
    dbConn.query("Select * from user LEFT JOIN meet_user ON user.id = meet_user.userId where meetId = ? ORDER BY meet_user.created_at DESC", meet.id, function (err, res) {
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
    dbConn.query("Select * from user LEFT JOIN meet_user ON user.id = meet_user.userId where meetId = ? ORDER BY meet_user.created_at DESC", meet.id, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, { ...meet, users: res});
        }
    });
};
User.findByProject = function (project, result) {
    dbConn.query("Select * from user LEFT JOIN project_user ON user.id = project_user.userId where projectId = ?", project.id, function (err, users) {
        if(err) result(err, null);
        result(null, { ...project, users });
    });
};
User.findByMeetId = function (id, result) {
    dbConn.query("Select * from user LEFT JOIN meet_user ON user.id = meet_user.userId where meetId = ? ORDER BY meet_user.created_at DESC", id, function (err, res) {
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
    dbConn.query("Select * from user LEFT JOIN project_user ON user.id = project_user.userId where projectId = ? ", id, function (err, res) {
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
    dbConn.query("Select * from user LEFT JOIN place_user ON user.id = place_user.userId where placeId = ? ", id, function (err, res) {
        if (err) result(err, null);
        result(null, res);
    });
};



User.findAll = function (result) {
    dbConn.query("Select * from user", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
User.update = function(id, user, result){
    dbConn.query("UPDATE user SET title=?,points=?,email=?,password=? WHERE id = ?", [user.title,user.points,user.email,user.password, id], function (err, res) {
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