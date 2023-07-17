'use strict';
const Place = require('../models/placeModel');

// Места
exports.findAll = function(req, res) {
    Place.findAll(req.query.latitude, req.query.longitude)(function(err, meets) {
        res.send(meets)
    });
};

