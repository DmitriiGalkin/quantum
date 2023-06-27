'use strict';
var dbConn = require('../db');

var Project = function(project){
    this.title = project.title;
    this.description = project.description;
    this.image = project.image;
    this.userId = project.user;
};
// Создание проекта
Project.create = function (project, result) {
    dbConn.query("INSERT INTO project set ?", project, function (err, res) {
        result(null, res.insertId);
    });
};
// Обновление проекта
Project.update = function(id, project, result){
    dbConn.query("UPDATE project SET title=?,description=?,image=? WHERE id = ?", [project.title,project.description,project.image, id], function (err, res) {
        result(null, res);
    });
};

// Проект
Project.findById = function (id, result) {
    dbConn.query("Select * from project where  id = ? ", id, function (err, res) {
        result(null, res.length ? res[0] : undefined);
    });
};
// Проекты встречи
Project.findByMeet = function (meet, result) {
    dbConn.query("Select * from project where  id = ? ", meet.projectId, function (err, res) {
        result(null, res.length ? res[0] : undefined);
    });
};
// Проекты пространства
Project.findByPlace = function (place, result) {
    dbConn.query('Select project.* from project LEFT JOIN meet ON meet.projectId = project.id LEFT JOIN place ON place.id = meet.placeId WHERE placeId = ? GROUP BY project.id', place.id, function (err, res) {
        result(null, res);
    });
};

// Проекты сообщества
// - это проекты участников сообщества
Project.findByCommunity = function (place, result) {
    dbConn.query('SELECT project.* FROM user_community LEFT JOIN project ON user_community.userId = project.userId WHERE user_community.communityId = ? GROUP BY project.id', place.id, function (err, res) {
        result(null, res);
    });
};

// Проекты участника
Project.findAllByUserId = id => function (result) {
    dbConn.query('SELECT project.* FROM user_project LEFT JOIN project ON user_project.projectId = project.id WHERE user_project.userId = ?', id, function (err, res) {
        result(null, res || []);
    });
};

module.exports = Project;