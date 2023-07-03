'use strict';
const User = require('../models/userModel');
var jwt = require('jsonwebtoken');
const async = require("async");
const Meet = require("../models/meetModel");

// Обновление участника
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        User.update(req.user.id, new User(req.body), function() {
            res.json({ error:false, message: 'Обновление участника' });
        });
    }
};
// Обновление токена
exports.logi = function(req, res) {
    User.logi(req.body.access_token, req.body.email, function(err, users) {
        if (err) res.send(err);
        if (!Boolean(users.length)){

            // Начинаем создавать пользователя
            const title = req.body.given_name + ' ' + req.body.family_name
            const new_user = new User({...req.body, title, token: req.body.access_token });
            if(req.body.constructor === Object && Object.keys(req.body).length === 0){
                res.status(400).send({ error:true, message: 'Сбой конструктора участника при создании участника через гугл' });
            } else {
                console.log(new_user, 'Создание пользователя Гугла')
                User.create(new_user, function(err, data) {
                    res.send({ error: false, message: "Участник создан", data });
                });
            }
        }
        res.send(users && users[0]);
    });
};
// Авторизация участника
exports.islogin = function(req, res) {
    User.islogin(req.body.email, req.body.password, function(err, users) {
        // Если участник найден
        if(users && users[0]) {
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

// Профиль
exports.findByUser = function(req, res) {
    async.parallel([
        User.findById(req.user.id),
        Meet.findAllByUserId2(req.user.id),
    ], function(err, results) {
        const [user, user_meets] = results
        res.send({ ...user, meetIds: user_meets.map((user_meet) => user_meet.meetId)});
    });
};
