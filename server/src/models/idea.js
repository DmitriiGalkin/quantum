'use strict';
var dbConn = require('../db');

var Idea = function(data){
    this.title = data.title;
    this.description = data.description;
    this.userId = data.userId; // Создатель идеи
    this.latitude = data.latitude;
    this.longitude = data.longitude;
};

Idea.create = function (data, result) {
    dbConn.query("INSERT INTO idea set ?", data, function (err, res) {
        if (err) {console.log(err,'err')}
        result(err, res.insertId);
    });
};

Idea.update = function(id, data, result){
    dbConn.query("UPDATE idea SET title=?, description=? WHERE id = ?", [data.title, data.description, id], function (err, res) {
        result(null, res);
    });
};

Idea.delete = function(id, result){
    dbConn.query(`UPDATE idea SET deleted = NOW() WHERE id = ?`, id, function (err, res) {
        result(null, res);
    });
};

Idea.findAll = function (params, result) {
    let where = 'WHERE idea.deleted IS NULL'
    if (params.ageFrom || params.ageTo || params.userId || (params.latitude && params.longitude)) {
        where =' LEFT JOIN user ON user.id = idea.userId ' + where + ' AND'
        if (params.ageFrom) {
            where += ' user.age > ' + params.ageFrom
        }
        if (params.ageTo && params.ageTo) {
            where += ' AND '
        }
        if (params.ageTo) {
            where += ' user.age < '+ params.ageTo
        }
        if (params.userId) {
            where += ' idea.userId = '+ params.userId
        }
        if (params.latitude && params.longitude) {
            where += ' idea.userId = '+ params.userId
        }
    }
    const f = `SELECT idea.* FROM idea ${where}`
    console.log(f,'f')
    dbConn.query(f, function (err, res) {
        result(null, res || []);
    });
};
Idea.findById = function (id, result) {
    dbConn.query("SELECT * FROM idea WHERE id = ?", id, function (err, res) {
        result(null, res[0]);
    });
};

module.exports = Idea;