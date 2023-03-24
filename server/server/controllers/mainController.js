'use strict';
const Main = require('../models/mainModel');
const Meet = require('../models/meetModel');
const Project = require('../models/projectModel');

exports.getMeets = function(req, res) {
    Meet.getUserMeets(function(err, meets) {
        if (err)
            res.send(err);
        res.send(meets);
    });
};
exports.getProjects = function(req, res) {
    Project.getUserProjects(function(err, projects) {
        if (err)
            res.send(err);
        res.send(projects);
    });
};