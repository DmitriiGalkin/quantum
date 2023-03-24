'use strict';
var dbConn = require('../db.config');

var Meet = function(data){
    this.projectId = data.projectId;
    this.datetime = data.datetime;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Meet.findAll = function (result) {
    dbConn.query("Select * from meet", function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Meet.findByProject = function (project, result) {
    dbConn.query("Select * from meet where projectId = ? ", project.id, function (err, res) {
        if(err) result(err, null);
        result(null, {...project, meets: res});
    });
};
Meet.findFirstByProject = function (project, result) {
    dbConn.query("Select * from meet where  projectId = ? LIMIT 1", project.id, function (err, res) {
        if(err) result(err, null);
        result(null, {...project, meet: res.length ? res[0] : undefined});
    });
};
Meet.findById = function (id, result) {
    dbConn.query("Select * from meet where  id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            // console.log('employees : ', res[0]);
            result(null, res[0]);
        }
    });
};

Meet.findByProjectId = function (id, result) {
    dbConn.query("Select * from meet where projectId = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else { result(null, res); }
    });
};

Meet.create = function (data, result) {
    dbConn.query("INSERT INTO meet set ?", data, function (err, res) {
        if (err) result(err, null);
        result(null, res.insertId);
    });
};

Meet.findAllByUserId = function (id, result) {
    dbConn.query("Select meet.* from meet LEFT JOIN project ON project.id = meet.projectId LEFT JOIN project_user ON project_user.projectId = project.id WHERE userId = ? AND DATE(datetime) > CURDATE()", id, function (err, res) {
        if(err)  result(err, null);
        else { result(null, res); }
    });
};


module.exports = Meet;