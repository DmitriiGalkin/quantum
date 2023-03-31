'use strict';
var dbConn = require('../db.config');

var Unique = function(unique){
    this.title = unique.title;
    this.points = unique.points;
};

Unique.update = function(id, unique, result){
    dbConn.query("UPDATE unique SET points=? WHERE id = ?", [unique.points, id], function (err, res) {
        result(null, res);
    });
};

module.exports = Unique;