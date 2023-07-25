const express = require('express')
const router = express.Router()
var passport = require('passport');

const userController =   require('./controllers/userController');
const meetController =   require('./controllers/meetController');
const imageController =   require('./controllers/imageController');
const placeController =   require('./controllers/placeController');
const strategys =   require('./strategys');

passport.use(strategys.google);
passport.use(strategys.mailru);
passport.use(strategys.yandex);


/**
 * Встречи
 */
router.get('/meets', userController.useUser, meetController.findAll);
router.get('/meet/:id', userController.useUser, meetController.findById);
router.post('/meet', userController.useUser, meetController.create);
router.put('/meet/:id', userController.useUser, meetController.update);
router.delete('/meet/:id', userController.useUser, meetController.delete );

/**
 * Картинки
 */
router.post('/image', imageController.upload);

/**
 * Авторизация
 */
router.post('/user/login', userController.login);
router.post('/user/googleLogin', userController.googleLogin);
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

/**
 * Участники
 */
router.get('/user', userController.useUser, function(req, res) { res.send(req.user) });
router.put('/user', userController.useUser, userController.update);
router.get('/userMeets', userController.useUser, meetController.findUserMeets);
router.put('/userMeet/:meetId', userController.useUser, meetController.toggleUserMeet );

/**
 * Места
 */
router.get('/places', userController.useUser, placeController.findAll);
router.post('/place', userController.useUser, placeController.create);

module.exports = router
