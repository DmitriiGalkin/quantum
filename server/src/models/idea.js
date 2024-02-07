'use strict';
var dbConn = require('../db');

var Idea = function(data){
    this.title = data.title;
    this.description = data.description;
    this.userId = data.userId; // Создатель идеи
    this.passportId = data.passportId; // Паспорт создателя идеи
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
    const dist = params.latitude && params.longitude && "ST_Distance_Sphere(point(" + params.latitude + ", " + params.longitude + "), point(latitude, longitude))"

    let where = 'WHERE idea.deleted IS NULL'
    if (params.ageFrom || params.ageTo || params.userId || (params.latitude && params.longitude)) {
        where =' LEFT JOIN user ON user.id = idea.userId ' + where
        if (params.ageFrom) {
            where += ' AND user.age > ' + params.ageFrom
        }
        // if (params.ageTo && params.ageTo) {
        //     where += ' AND '
        // }
        if (params.ageTo) {
            where += ' AND user.age < '+ params.ageTo
        }
        if (params.userId) {
            where += ' AND idea.userId = '+ params.userId
        }
        if (params.latitude && params.longitude) {
            const RADIUS = 100000
            where += ` AND ${dist} < ` + RADIUS
        }
    }
    const f = `SELECT idea.* ${dist ? `, ${dist} AS distance` : ''} FROM idea ${where}`
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