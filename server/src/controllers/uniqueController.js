'use strict';
const Unique = require('../models/uniqueModel');

// Обновление таланта участника
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Конструктор сломался' });
    }else{
        Unique.update(req.params.id, new Unique(req.body), function() {
            res.json({ error:false, message: 'Обновление таланта участника' });
        });
    }
};

// Таланты участника
exports.findByUser = function(req, res) {
    Unique.findUniquesById(req.user.id, function(err, uniques) {
        res.send(uniques);
    });
};