'use strict';
var dbConn = require('../db');

var Project = function(data){
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.userId = data.userId; // Создатель проекта
    this.timing = data.timing; // Расписание проекта
};
// Создание проекта
Project.create = function (data, result) {
    dbConn.query("INSERT INTO project set ?", data, function (err, res) {
        result(err, res.insertId);
    });
};
// Обновление проекта
Project.update = function(id, meet, result){
    dbConn.query("UPDATE project SET title=?, description=?, image=? WHERE id = ?", [meet.title, meet.description, meet.image, id], function (err, res) {
        result(null, res);
    });
};
// Удаление проекта
Project.delete = function(id, result){
    dbConn.query(`DELETE FROM project WHERE id = ?`, id, function (err, res) {
        result(null, res);
    });
};
// Проекты
Project.findAll = () => function (result) {
    dbConn.query("SELECT * FROM project", function (err, res) {
        result(null, res || []);
    });
};
// Проект по номеру
Project.findById = function (id, result) {
    dbConn.query("SELECT * FROM project WHERE id = ?", id, function (err, res) {
        result(null, res[0]);
    });
};

module.exports = Project;