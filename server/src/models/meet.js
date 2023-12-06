'use strict';
var dbConn = require('../db');
const Project = require('./project');
var LocalDateTime = require('@js-joda/core').LocalDateTime;
var ChronoUnit = require('@js-joda/core').ChronoUnit;

var Meet = function(data){
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.datetime = data.datetime;
    this.userId = data.userId; // Идентификатор создателя
    this.projectId = data.project?.id; // Идентификатор проекта
    this.price = data.price; // Идентификатор проекта
    this.ageFrom = data.ageFrom;
    this.ageTo = data.ageTo;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
};

Meet.create = function (data, result) {
    dbConn.query("INSERT INTO meet set ?", data, function (err, res) {
        console.log(err, "err");
        result(err, res.insertId);
    });
};

Meet.update = function(id, meet, result){
    dbConn.query("UPDATE meet SET title=?, description=?, datetime=?, image=?, latitude=?, longitude=?, projectId=?, price=?, ageFrom=?, ageTo=? WHERE id = ?", [meet.title, meet.description, meet.datetime, meet.image, meet.latitude, meet.longitude, meet.projectId, meet.price, meet.ageFrom, meet.ageTo, id], function (err, res) {
        result(null, res);
    });
};

Meet.delete = function(id, result){
    dbConn.query(`DELETE FROM meet WHERE id = ?`, id, function (err, res) {
        result(null, res);
    });
};
// Встречи
const RADIUS = 100000 // Количество метров между мной и местом встречи TODO: сократить радиус с ростом аудитории
Meet.findAll = () => function (result) {
    dbConn.query("SELECT *, date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime from meet " +
        "WHERE DATE(datetime) >= CURDATE() " +
        //"AND ST_Distance_Sphere(point(" + x + ", " + y + "), point(x, y)) < " + RADIUS + " " +
        "ORDER BY datetime", function (err, res) {
        result(null, res || []);
    });
};

Meet.findById = function (id, result) {
    dbConn.query("SELECT *, date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime FROM meet WHERE id = ?", id, function (err, res) {
        result(null, res[0]);
    });
};
Meet.findByProjectId = function (id, result) {
    dbConn.query("SELECT meet.*, date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime, place.title AS placeTitle FROM meet LEFT JOIN place ON place.latitude=meet.latitude AND place.longitude=meet.longitude WHERE projectId = ?", id, function (err, res) {
        result(null, res);
    });
};


// Встречи участника
Meet.findAllByUserId2 = (id) => function (result) {
    dbConn.query("SELECT * FROM user_meet WHERE userId = ?", id, function (err, res) {
        result(null, res);
    });
};
// Встречи участника
Meet.findAllByUserId = () => function (result) {
    dbConn.query("SELECT *, date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime from meet where DATE(datetime) >= CURDATE() ORDER BY datetime", function (err, res) {
        //console.log(err,'err')
        result(null, res || []);
    });
};
// Встречи на которые пользователь принимает участие
Meet.findUserMeet = function(userId, result){
    dbConn.query("SELECT *, date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime FROM meet LEFT JOIN user_meet ON user_meet.meetId = meet.id WHERE user_meet.userId = ? ORDER BY datetime DESC", [userId], function (err, res) {
        result(null, res.length ? res : []);
    });
};

//(1 = Sunday, 2 = Monday, …, 7 = Saturday)
function toODBC (l) {
    switch (l) {
        case 0: {
            return 2
        }
        case 1: {
            return 3
        }
        case 2: {
            return 4
        }
        case 3: {
            return 5
        }
        case 4: {
            return 6
        }
        case 5: {
            return 7
        }
        case 6: {
            return 1
        }
    }
}

Meet.check = function (timer, result) {
    const day = toODBC(timer.dayOfWeek)
    dbConn.query("SELECT *, DAYOFWEEK(datetime) as pm FROM meet WHERE DATE(datetime) >= CURDATE() AND DAYOFWEEK(datetime) = ? AND projectId = ?", [day, timer.projectId], function (err, res) {
        if (!res.length) {
            result(null, timer);
        } else {
            result(null);
        }
    });
};

// Встреча по номеру
Meet.createByTimer = function (timer, result) {
    Project.findById(timer.projectId, function(err, project) {
        const correctDayOfWeek = timer.dayOfWeek + 1
        const sevenDays = [0,1,2,3,4,5,6].map(number => {
            return LocalDateTime.now().plusDays(number).withHour(timer.time)
        })

        const data = {
            title: project.title,
            description: project.description,
            image: project.image,
            datetime: sevenDays.find(d=>d.dayOfWeek().value()===correctDayOfWeek).truncatedTo(ChronoUnit.HOURS).toString(),
            userId: project.userId,
            projectId: project.id,
            latitude: project.latitude,
            longitude: project.longitude,
            ageFrom: project.ageFrom,
            ageTo: project.ageTo,
        }
        dbConn.query("INSERT INTO meet set ?", data, function (err, res) {
            console.log(err, "err");
            result(err, res.insertId);
        });
    })
};





module.exports = Meet;