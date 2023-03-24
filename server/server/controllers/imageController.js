'use strict';
const ProjectImage = require('../models/projectImageModel');
var formidable = require('formidable');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
var path = require('path')
var ID = uuidv4();

exports.getImages = function(req, res) {
    let form = new formidable.IncomingForm();

    form.parse(req, function (error, fields, file) {
        let filepath = file.myFile.filepath;
        let newpath = '/Users/user/Projects/quantum-server/public/';
        let ext = path.extname(file.myFile.originalFilename)
        let newFileName = (ID + ext)
        newpath += newFileName

        fs.rename(filepath, newpath, function (err) {
            if (err) {
                console.log(err)
            }

            ProjectImage.addImage({ projectId: 1, image: newFileName, created_at: new Date() }, function(err, image) {
                if (err) res.send(err);
                res.send(image);
            });
        });
    });
}
