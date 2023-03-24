'use strict';
var dbConn = require('../db.config');

var ProjectImage = function(data){
    this.projectId = data.projectId;
    this.image = data.image;
    this.created_at = new Date();
};

// Добавляем новую картинку в БД по проекту
ProjectImage.addImage = function (projectImage, result) {
    dbConn.query("INSERT INTO project_image set ?", projectImage, function (err, res) {
        if(err) result(null, err);
        result(null, res);
    });
};

ProjectImage.findByProjectId = function (id, result) {
    dbConn.query('Select image from project_image WHERE projectId = ?', id, function (err, res) {
        result(null, res.map(({ image }) => 'http://localhost:3002/' + image));
    });
};
module.exports = ProjectImage;