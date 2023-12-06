'use strict';
const Meet = require('../models/meet');
const Visit = require('../models/visit');

exports.create = function(req, res) {
    Meet.findById(req.params.meetId, function(err) {
        if (err) { return res.json({error:true, message: "Встреча не найдена"}); }
        Visit.findById(req.params.userId, req.params.meetId, function(err, currentUserMeet) {
            if (currentUserMeet) { return res.json({error:true,message:"Участие уже существует"}); }
            if (Number(req.params.userId) !== req.user.id) { return res.json({error:true,message:"Нельзя добавлять участника отличного от себя"}); }

            const userMeet = new Visit({...req.params, userId: req.params.userId});
            Visit.create(userMeet, function() {
                res.json({error:false,message:"Участие создано"});
            });
        })
    })
};

exports.delete = function(req, res) {
    Meet.findById(req.params.meetId, function(err) {
        if (err) { return res.json({error:true, message: "Встреча не найдена"}); }
        Visit.findById(req.params.userId, req.params.meetId, function(err, userMeet) {
            if (err) { return res.json({error:true,message:"Участие не существует"}); }
            if (Number(req.params.userId) !== req.user.id) { return res.json({error:true,message:"Нельзя удалять участника отличного от себя"}); }

            Visit.delete( req.params.userId, req.params.meetId, function() {
                res.json({ error:false, message: 'Удаление участника из встречи' });
            });
        })
    })
};

exports.started = function(req, res) {
    Meet.findById(req.params.meetId, function(err, meet) {
        if (err) { return res.json({error:true, message: "Встреча не найдена"}); }
        if (meet.userId !== req.user.id) { return res.json({error:true, message: "Вы не автор встречи"}); }
        Visit.findById(req.params.userId, req.params.meetId, function(err) {
            if (err) { return res.json({ error:true, message: 'Участник не участвует во встрече' }); }
            Visit.started( req.params.userId, req.params.meetId, function() {
                res.json({ error:false, message: 'Участник начал участие во встрече' });
            });
        })
    })
};

exports.stopped = function(req, res) {
    Meet.findById(req.params.meetId, function(err, meet) {
        if (err) { return res.json({error:true, message: "Встреча не найдена"}); }
        if (meet.userId !== req.user.id) { return res.json({error:true, message: "Вы не автор встречи"}); }
        Visit.findById(req.params.userId, req.params.meetId, function(err) {
            if (err) { return res.json({ error:true, message: 'Участник не участвует во встрече' }); }
            Visit.stopped( req.params.userId, req.params.meetId, function() {
                res.json({ error:false, message: 'Участник закончил участие во встрече' });
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
