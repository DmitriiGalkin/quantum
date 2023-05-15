'use strict';
var dbConn = require('../db');

var Community = function(place){
    this.title = place.title;
    this.description = place.description;
};

Community.findAll = function (result) {
    dbConn.query("Select * from community", function (err, res) {
        result(null, res);
    });
};
Community.findById = function (id, result) {
    dbConn.query("Select * from community where  id = ? ", id, function (err, res) {
        result(null, res.length ? res[0] : undefined);
    });
};

module.exports = Community;