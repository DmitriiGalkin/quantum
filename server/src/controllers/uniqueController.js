'use strict';
const Unique = require('../models/uniqueModel');

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Конструктор сломался' });
    }else{
        Unique.update(req.params.id, new Unique(req.body), function(err, data) {
            if (err) res.send(err);
            res.json({ error:false, message: 'task successfully updated' });
        });
    }
};