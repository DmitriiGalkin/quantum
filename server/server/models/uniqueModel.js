'use strict';
var dbConn = require('../db.config');

var Unique = function(unique){
    this.title = unique.title;
    this.points = unique.points;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Unique.update = function(id, unique, result){
    dbConn.query("UPDATE unique SET points=? WHERE id = ?", [unique.points, id], function (err, res) {
        if(err) result(null, err);
        result(null, res);
    });
};

module.exports = Unique;