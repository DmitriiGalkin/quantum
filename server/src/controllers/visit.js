'use strict';
const Meet = require('../models/meet');
const Visit = require('../models/visit');

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
            if (meet.userId !== req.user.id) { return res.json({ error: true, message: "Нет прав на редактирование" }); }
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
            if (meet.userId !== req.user.id) { return res.json({ error: true, message: "Нет прав на редактирование" }); }
            Visit.stopped( req.params.id, function() {
                res.json({ error:false, message: 'Участник начал участие во встрече' });
            });
        })
    })
};

exports.paided = function(req, res) {
    if (Number(req.params.userId) !== req.user.id) { return res.json({error:true, message: "Вы не тот участник"}); }
    Meet.findById(req.params.meetId, function(err) {
        if (err) { return res.json({error:true, message: "Встреча не найдена"}); }
        Visit.findById(req.params.userId, req.params.meetId, function(err) {
            if (err) { return res.json({ error:true, message: 'Участник не участвует во встрече' }); }
            Visit.paided( req.params.userId, req.params.meetId, function() {
                res.json({ error:false, message: 'Участник оплатил участие' });
            });
        })
    })
};
