'use strict';
var dbConn = require('../db');

var Timing = function(data){
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.userId = data.userId; // Создатель проекта
    this.timing = data.timing; // Расписание проекта
};

// Обновление расписания
Timing.update = (projectId) => function(time, result){
    dbConn.query("UPDATE timing SET title=?, description=?, image=? WHERE id = ?", [meet.title, meet.description, meet.image, time.id], function (err, res) {
        result(null, res);
    });
};

module.exports = Timing;