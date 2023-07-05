'use strict';
var dbConn = require('../db');
const User = require('../models/userModel');
var jwt = require('jsonwebtoken');

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
/**
 * С бека пришла авторизационная информация с токеном по пользователю,
 * надобно проверить есть ли такой пользователь у нас уже. Если нет то создать, если есть то просто прописать ему токен
 */
exports.googleLogin = function(req, res) {
    User.findByEmail(req.body.email, function(err, user) {
        if (user) {
            User.updateTokenById(req.body.access_token, user.id, function() {
                res.send({ error: false, message: "Участник обновлен" });
            });
        } else {
            const user = new User({
                token: req.body.access_token,
                title: req.body.name,
                image: req.body.picture,
                email: req.body.email
            });
            if(req.body.constructor === Object && Object.keys(req.body).length === 0){
                res.status(400).send({ error:true, message: 'Сбой конструктора участника при создании участника через гугл' });
            } else {
                User.create(user, function(err, data) {
                    res.send({ error: false, message: "Участник создан" });
                });
            }
        }
    })
};
// Авторизация участника
exports.login = function(req, res) {
    User.findById(1, function(err, user) {
        // Если участник найден
        if(user) {
            var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            console.log('3')
            User.updateTokenById(token, user.id, function() {
                res.send({ access_token: token });
            });
        }
    });
};
// Участник
exports.findById = function(req, res) {
    User.findById(req.user.id, function(err, users) {
        res.send(users && users[0]);
    });
};
