'use strict';
const User = require('../models/userModel');
const async = require("async");
const Project = require("../models/projectModel");
const Meet = require("../models/meetModel");

// Профиль
exports.findByUser = function(req, res) {
    async.parallel([
        User.findById(req.user.id),
        Project.findAllByUserId(req.user.id),
        Meet.findAllByUserId2(req.user.id),
    ], function(err, results) {
        const [user, projects, user_meets] = results
        res.send({ user, projectIds: projects.map((project) => project.id), meetIds: user_meets.map((user_meet) => user_meet.meetId)});
    });
};
