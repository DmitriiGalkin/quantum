'use strict';
const Participation = require('../models/participation');
const Project = require('../models/project');

exports.create = function(req, res) {
    Project.findById(req.body.projectId, function(err) {
        if (err) { return res.json({error:true, message: "Проект не найден"}); }
        Participation.findByUserAndProjectIds(req.user.id, req.body.projectId, function(err, currentParticipation) {
            if (currentParticipation) { return res.json({error:true,message:"Вы уже состоите в проекте"}); }

            const participation = new Participation({...req.body, userId: req.user?.id });
            Participation.create(participation, function(err, projectId) {
                res.json(projectId);
            });
        })
    })
};

exports.delete = function(req, res) {
    Participation.findById(req.params.id, function(err, participation) {
        if (err) { return res.json({error:true,message:"Участие не существует"}); }
        Project.findById(participation.projectId, function(err, project) {
            if (err) { return res.json({ error: true, message: "Проект не найден" }); }
            if (participation.userId !== req.user.id && project.userId !== req.user.id) { return res.json({ error: true, message: "Нет прав на удаление" }); }

            Participation.delete(participation.id, function() {
                res.json({ error:false, message: 'Удаление участия в проекте' });
            });
        });
    });
};
