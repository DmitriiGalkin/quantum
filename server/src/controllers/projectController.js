'use strict';
const async = require("async");
const formidable = require('formidable');
const fs = require('fs');
const path = require('path')
const mime = require('mime');
const { v4: uuid } = require('uuid');


// const { PutObjectCommand, CreateBucketCommand } = require('@aws-sdk/client-s3');

// const s3Client = require('../sampleClient.js');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const S3 = require('../s3');

const Project = require('../models/projectModel');
const Meet = require('../models/meetModel');
const Place = require('../models/placeModel');
const User = require('../models/userModel');
const UserProject = require('../models/userProjectModel');
// var YandexCloud = require('../aws');

const getS3imageURL = (image) => {
    return 'https://storage.yandexcloud.net/quantum-education/' + image
}

// Проект
exports.findById = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        // Если проект не найден
        if (!project) {
            res.status(400).send({ error:true, message: 'Проект с таким номером не найден' });
        } else {
            User.findByProject(project, function(err, users) {
                Meet.findByProject(project, function(err, meets) {
                    async.map(meets, User.findByMeet, function(err, meetsUsers) {
                        async.map(meets, Place.findByMeet, function(err, meetsPlace) {
                            const active = users.some((u) => req.user.id === u.id)
                            res.send({
                                ...project,
                                image: getS3imageURL(project.image),
                                users,
                                meets: meets.map((p, index) => {
                                    const active = meetsUsers[index]?.some((user) => user.userId === req.user.id)
                                    return ({ ...p, users: meetsUsers[index], place: meetsPlace[index], project, active})
                                }),
                                active
                            });
                        });
                    });
                });
            });
        }
    });
};
// Создание проекта
exports.create = function(req, res) {
    const project = new Project(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    } else {
        Project.create(project, function(err, projectId) {
            const userProject = new UserProject({projectId, userId: req.user.id});
            UserProject.create(userProject, function() {
                res.json(projectId);
            });
        });
    }
};

// function uploadImage(req, cb) {
//     let form = new formidable.IncomingForm();
//
//     form.parse(req, async function (error, fields, files) {
//         const file = files.customFile
//         console.log(files,'files')
//         const filename = uuid() + path.extname(file.originalFilename)
//
//         const params = {
//             Bucket: 'quantum-education', // имя bucket
//             Key: filename, // имя файла в облаке
//             Body: fs.readFileSync(file.filepath), // данные файла в blob
//             ContentType: mime.getType(file.originalFilename), // тип файла
//         }
//
//         await new Promise(function(resolve, reject) {
//             S3.send(new PutObjectCommand(params)).then(
//                 (data) => {
//                     console.log(data)
//                     resolve(data)
//                 },
//                 (error) => {
//                     console.log(error)
//                     reject(error)
//                 }
//             );
//         });
//
//         cb(filename)
//     })
// }

// Загрузка картинки
exports.s3 = function(req, res) {
    let form = new formidable.IncomingForm();

    form.parse(req, async function (error, fields, files) {
        const file = files.image
        const filename = uuid() + path.extname(file.originalFilename)

        const params = {
            Bucket: 'quantum-education', // имя bucket
            Key: filename, // имя файла в облаке
            Body: fs.readFileSync(file.filepath), // данные файла в blob
            ContentType: mime.getType(file.originalFilename), // тип файла
        }

        await new Promise(function(resolve, reject) {
            S3.send(new PutObjectCommand(params)).then(
                (data) => {
                    console.log(data)
                    resolve(data)
                },
                (error) => {
                    console.log(error)
                    reject(error)
                }
            );
        });

        res.json(filename);
    })
};

// Обновление проекта
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        const obj = new Project(req.body)
        Project.update(req.params.id, obj, function() {
            res.json({ error:false, message: 'Проект обновлен' });
        });
    }
};
// Добавление участника в проект
exports.createUserProject = function(req, res) {
    const data = new UserProject({...req.params, userId: req.user.id});
    if(req.body.constructor === Object && Object.keys(req.params).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        UserProject.create(data, function() {
            res.json({error:false,message:"Добавление участника в проект"});
        });
    }
};
// Удаление участника из проекта
exports.deleteUserProject = function(req, res) {
    UserProject.delete(req.params.projectId, req.user.id, function() {
        res.json({ error:false, message: 'Удаление участника из проекта' });
    });
};

// Проекты участника
exports.findByUser = function(req, res) {
    Project.findAllByUserId(req.user.id)(function(err, projects) {
        async.map(projects, Meet.findByProject, function(err, projectsMeets) {
            async.map(projects, Place.findByProject, function(err, projectsPlaces) {
                async.map(projects, User.findByProject, function(err, projectsUsers) {
                    res.send(projects.map((p, index) => {
                        const active = projectsUsers[index]?.some((user) => user.userId === req.user.id)
                        return ({ ...p, meets: projectsMeets[index], places: projectsPlaces[index], users: projectsUsers[index], active})
                    }));
                });
            });
        })
    });
};
