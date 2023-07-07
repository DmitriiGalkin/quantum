const express = require('express')
const router = express.Router()
var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const userController =   require('./controllers/userController');
const meetController =   require('./controllers/meetController');
const imageController =   require('./controllers/imageController');
const User = require('./models/userModel');

passport.use(new GoogleStrategy({
        clientID: '804980223837-9e350rj8p8glgbqel5c5rmh6jafnf1u2.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:4000/oauth2/redirect/google',
        scope: [ 'profile', 'email' ],
        state: false
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findByEmail(profile.emails[0].value, function(err, user) {
            if (user) {
                User.updateTokenById(accessToken, user.id, function() {
                    return cb(null, { username: accessToken });
                });
            }
        })
    }
));
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', (req, res) => passport.authenticate('google', function(err, user) {
    if (!user) { return res.redirect('/login'); }
    res.redirect('http://localhost:3000/google?token=' + user.username);
})(req, res));

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

/**
 * Участники
 */
router.get('/user', userController.useUser, function(req, res) { res.send(req.user) });
router.put('/user', userController.useUser, userController.update);

router.put('/userMeet/:meetId', userController.useUser, meetController.toggleUserMeet );


module.exports = router
