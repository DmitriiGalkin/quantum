'use strict';
const GoogleStrategy = require('passport-google-oauth20');
const MailStrategy = require('passport-mail');
const YandexStrategy = require('passport-yandex').Strategy;

const User = require('./models/userModel');

function findOrCreate(accessToken, refreshToken, profile, cb) {
    User.findByEmail(profile.emails[0].value, function(err, user) {
        if (user) {
            User.updateTokenById(accessToken, user.id, function() {
                return cb(null, { username: accessToken });
            });
        } else {
            console.log(profile,'profile')
            const image = profile?.photos?.length ? profile.photos[0].value : '22'
            const user = new User({
                token: accessToken,
                title: profile.displayName,
                image,
                email: profile.emails[0].value
            });
            User.create(user, function(err, data) {
                return cb(null, { username: accessToken });
            });
        }
    })
}

exports.google = new GoogleStrategy({
        clientID: '804980223837-9e350rj8p8glgbqel5c5rmh6jafnf1u2.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: process.env.BACKEND_SERVER + '/oauth2/redirect/google',
        scope: [ 'profile', 'email' ],
        state: false
    }, findOrCreate
)

exports.mailru = new MailStrategy({
        clientID: '788168',
        clientSecret: '7c337b129d489f429159cfe62f5a5861',
        callbackURL: process.env.BACKEND_SERVER + '/oauth2/redirect/mailru',
    }, findOrCreate
)

exports.yandex = new YandexStrategy({
        clientID: '0c3cdb9c0030423ea5349301e231cba8',
        clientSecret: '655c57dcdbbf4e498a52f5b66e49bfd6',
        callbackURL: process.env.BACKEND_SERVER + '/oauth2/redirect/yandex',
    }, findOrCreate
)
//https://selfproject.ru/api/oauth2/redirect/google
