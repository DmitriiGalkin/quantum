'use strict';
const Invite = require('../models/invite');
const Project = require('../models/project');

exports.create = function(req, res) {
    Project.findById(req.body.projectId, function(err) {
        if (err) { return res.json({error:true, message: "Проект не найден"}); }
        const invite = new Invite(req.body);
        Invite.create(invite, function(err, inviteId) {
            res.json(inviteId);
        });
    })
};
//
// exports.delete = function(req, res) {
//     Participation.findById(req.params.id, function(err, participation) {
//         if (err) { return res.json({error:true,message:"Участие не существует"}); }
//         Project.findById(participation.projectId, function(err, project) {
//             if (err) { return res.json({ error: true, message: "Проект не найден" }); }
//             if (!req.users.map(u=>u.id).includes(participation.userId) && project.passportId !== req.passport.id) { return res.json({ error: true, message: "Нет прав на удаление" }); }
//
//             Participation.delete(participation.id, function() {
//                 res.json({ error:false, message: 'Удаление участия в проекте' });
//             });
//         });
//     });
// };
