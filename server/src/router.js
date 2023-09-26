const express = require('express')
const router = express.Router()
var passport = require('passport');

const user =   require('./controllers/user');
const meet =   require('./controllers/meet');
const image =   require('./controllers/image');
const place =   require('./controllers/place');
const project =   require('./controllers/project');
const strategys =   require('./strategys');
const helper =   require('./helper');

/**
 * Стратегии авторизации
 */
passport.use(strategys.google);
passport.use(strategys.mailru);
passport.use(strategys.yandex);
passport.use(strategys.vkontakte);

/**
 * Встречи
 */
router.get('/meets', user.useUser, meet.findAll);
router.get('/meet/:id', user.useUser, meet.findById);
router.post('/meet', user.useUser, helper.checkConstructor, meet.create);
router.put('/meet/:id', user.useUser, helper.checkConstructor, meet.update);
router.delete('/meet/:id', user.useUser, meet.delete );

/**
 * Картинки
 */
router.post('/image', image.upload);

/**
 * Авторизация
 */
router.post('/user/login', user.login);
router.post('/user/googleLogin', user.googleLogin);
router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', (req, res) => passport.authenticate('google', function(err, user) {
    if (!user) { return res.redirect('/login'); }
    res.redirect(process.env.FRONTEND_SERVER + '/?access_token=' + user.username);
})(req, res));
router.get('/login/federated/mailru', passport.authenticate('mailru'));
router.get('/oauth2/redirect/mailru', (req, res) => passport.authenticate('mailru', function(err, user) {
    if (!user) { return res.redirect('/login'); }
    res.redirect(process.env.FRONTEND_SERVER + '/?access_token=' + user.username);
})(req, res));
router.get('/login/federated/yandex', passport.authenticate('yandex'));
router.get('/oauth2/redirect/yandex', (req, res) => passport.authenticate('yandex', function(err, user) {
    if (!user) { return res.redirect('/login'); }
    res.redirect(process.env.FRONTEND_SERVER + '/?access_token=' + user.username);
})(req, res));
router.get('/login/federated/vkontakte', passport.authenticate('vkontakte'));
router.get('/oauth2/redirect/vkontakte', (req, res) => passport.authenticate('vkontakte', function(err, user) {
    if (!user) { return res.redirect('/login'); }
    console.log(user,'user')
    res.redirect(process.env.FRONTEND_SERVER + '/?access_token=' + user.username);
})(req, res));

/**
 * Участники
 */
router.get('/user', user.useUser, function(req, res) { res.send(req.user) });
router.put('/user', user.useUser, user.update);
router.get('/userMeets', user.useUser, meet.findUserMeets);
router.put('/userMeet/:meetId', user.useUser, meet.toggleUserMeet );

/**
 * Места
 */
router.get('/places', user.useUser, place.findAll);
router.post('/place', user.useUser, place.create);

/**
 * Проекты
 */
router.get('/projects', user.useUser, project.findAll);
router.get('/timing', project.timing);
router.get('/project/:id', user.useUser, project.findById);
router.post('/project', user.useUser, helper.checkConstructor, project.create);
router.put('/project/:id', user.useUser, helper.checkConstructor, project.update);

module.exports = router
