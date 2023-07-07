'use strict';
const GoogleStrategy = require('passport-google-oauth20');
const User = require('./models/userModel');

exports.google = new GoogleStrategy({
        clientID: '804980223837-9e350rj8p8glgbqel5c5rmh6jafnf1u2.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: process.env.BACKEND_SERVER + '/oauth2/redirect/google',
        scope: [ 'profile', 'email' ],
        state: false
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findByEmail(profile.emails[0].value, function(err, user) {
            if (user) {
                User.updateTokenById(accessToken, user.id, function() {
                    return cb(null, { username: accessToken });
                });
            } else {
                const user = new User({
                    token: accessToken,
                    title: profile.displayName,
                    image: profile.photos[0].value,
                    email: profile.emails[0].value
                });
                User.create(user, function(err, data) {
                    return cb(null, { username: accessToken });
                });
            }
        })
    }
)
