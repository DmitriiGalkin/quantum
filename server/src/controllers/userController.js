'use strict';
const User = require('../models/userModel');
var jwt = require('jsonwebtoken');

// Создание участника
exports.create = function(req, res) {
    const new_user = new User(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Сбой конструктора участника при создании участника' });
    } else {
        User.create(new_user, function(err, data) {
            res.json({ error: false, message: "Участник создан", data });
        });
    }
};
// Обновление участника
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        User.update(req.params.id, new User(req.body), function() {
            res.json({ error:false, message: 'Обновление участника' });
        });
    }
};
// Обновление токена
exports.logi = function(req, res) {
    User.logi(req.body.access_token, function(err, users) {
        if (err) res.send(err);
        res.send(users && users[0]);
    });
};
// Авторизация участника
exports.islogin = function(req, res) {
    User.islogin(req.body.email, req.body.password, function(err, users) {
        // Если участник найден
        if(users[0]) {
            var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            User.update(users[0].id, {...users[0], token}, function() {
                res.send({ access_token: token });
            });
        }
    });
};
// Участник
exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, users) {
        res.send(users && users[0]);
    });
};

