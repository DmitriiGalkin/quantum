'use strict';
const User = require('../models/userModel');

exports.logi = function(req, res) {
    User.logi(req.body.access_token, function(err, users) {
        if (err) res.send(err);
        res.send(users && users[0]);
    });
};

exports.create = function(req, res) {
    const new_user = new User(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Сбой конструктора участника при создании участника' });
    } else {
        User.create(new_user, function(err, data) {
            if (err) res.send(err);
            res.json({ error: false, message: "Участник создан", data });
        });
    }
};

exports.islogin = function(req, res) {
    User.islogin(req.body.email, req.body.password, function(err, users) {
        if (err) res.send(err);
        res.send(users && users[0]);
    });
};
exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, users) {
        if (err) res.send(err);
        res.send(users && users[0]);
    });
};
exports.findByUser = function(req, res) {
    User.findUniquesById(req.user.id, function(err, employee) {
        if (err) res.send(err);
        res.send(employee);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        User.update(req.params.id, new User(req.body), function(err, user) {
            if (err) { res.send(err);}
            res.json({ error:false, message: 'Employee successfully updated' });
        });
    }
};

exports.findByPlaceId = function(req, res) {
    User.findByPlaceId(req.params.id, function(err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });
};

