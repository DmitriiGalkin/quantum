'use strict';
const User = require('../models/user');
const Passport = require('../models/passport');

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

exports.delete = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return res.json({error:true,message:"Ребенок не существует"}); }
        Passport.findById(user.passportId, function(err, passport) {
            if (err) { return res.json({ error: true, message: "Родитель не найден" }); }
            if (passport.id !== req.passport.id) { return res.json({ error: true, message: "Нет прав на удаление" }); }
            console.log('типа удаление участника')
            // User.delete( req.params.id, function() {
            //     res.json({ error:false, message: 'Удаление участника из встречи' });
            // });
        })
    })
};

// Участник
exports.findById = function(req, res) {
    User.findById(req.user.id, function(err, users) {
        res.send(users && users[0]);
    });
};