'use strict';
const async = require("async");
const Meet = require('../models/meet');
const User = require('../models/user');
const Visit = require('../models/visit');
const Project = require('../models/project');
const Place = require('../models/place');

exports.create = function(req, res) {
    Meet.findById(req.body.meetId, function(err) {
        if (err) { return res.json({error:true, message: "Встреча не найдена"}); }
        Visit.findByUserAndMeetIds(req.body.userId, req.body.meetId, function(err, currentVisit) {
            if (currentVisit) { return res.json({error:true,message:"Участие уже существует"}); }
            if (!req.users.map(u=>u.id).includes(req.body.userId)) { return res.json({error:true,message:"Нельзя добавлять участника отличного от себя"}); }

            const visit = new Visit(req.body);
            Visit.create(visit, function() {
                res.json({error:false,message:"Участие создано"});
            });
        })
    })
};

exports.delete = function(req, res) {
    Visit.findById(req.params.id, function(err, visit) {
        if (err) { return res.json({error:true,message:"Участие не существует"}); }
        Meet.findById(visit.meetId, function(err, meet) {
            if (err) { return res.json({ error: true, message: "Встреча не найдена" }); }
            if (!req.users.map(u=>u.id).includes(visit.userId)) { return res.json({ error: true, message: "Нет прав на удаление" }); }
            Visit.delete( req.params.id, function() {
                res.json({ error:false, message: 'Удаление участника из встречи' });
            });
        })
    })
};

exports.started = function(req, res) {
    Visit.findById(req.params.id, function(err, visit) {
        if (err) { return res.json({error:true,message:"Участие не существует"}); }
        Meet.findById(visit.meetId, function(err, meet) {
            if (err) { return res.json({ error: true, message: "Встреча не найдена" }); }
            if (meet.passportId !== req.passport.id) { return res.json({ error: true, message: "Нет прав на редактирование" }); }
            Visit.started( req.params.id, function() {
                res.json({ error:false, message: 'Участник начал участие во встрече' });
            });
        })
    })
};


exports.stopped = function(req, res) {
    Visit.findById(req.params.id, function(err, visit) {
        if (err) { return res.json({error:true,message:"Участие не существует"}); }
        Meet.findById(visit.meetId, function(err, meet) {
            if (err) { return res.json({ error: true, message: "Встреча не найдена" }); }
            if (meet.passportId !== req.passport.id) { return res.json({ error: true, message: "Нет прав на редактирование" }); }
            Visit.stopped( req.params.id, function() {
                res.json({ error:false, message: 'Участник начал участие во встрече' });
            });
        })
    })
};

exports.paided = function(req, res) {
    Visit.findById(req.params.id, function(err, visit) {
        if (err) res.json({error: true, message: 'Участник не участвует во встрече'});
        Meet.findById(visit.meetId, function (err, meet) {
            if (err) res.json({error: true, message: "Встреча не найдена"});
            if (meet.passportId !== req.passport.id) res.json({error: true, message: "Вы не владелец встречи, чтобы принимать решение по оплате"});
            Visit.paided(req.params.id, function () {
                res.json({error: false, message: 'Участник оплатил участие'});
            });
        })
    })
};

exports.findAll = function(req, res) {
    Visit.findByUserId(req.query.userId, function(err, visits) {
        async.map(visits.map(v=>v.meetId), Meet.findById, function(err, meets) {
            async.map(meets.map(m=>m.projectId), Project.findById, function(err, projects) {
                async.map(projects.map(p=>p.placeId), Place.findById, function(err, places) {
                    res.send(visits.map((visit, index) => ({
                          ...visit,
                          project: projects[index],
                          meet: meets[index],
                          place: places[index],
                      })
                    ));
                });
            });
        });
    });
};
