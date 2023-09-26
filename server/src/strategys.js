'use strict';
const GoogleStrategy = require('passport-google-oauth20');
const MailStrategy = require('passport-mail');
const YandexStrategy = require('passport-yandex').Strategy;
const VKStrategy = require('passport-vkontakte').Strategy;

const User = require('./models/user');

function findOrCreate(accessToken, refreshToken, profile, cb) {
    // Не все системы авторизации даруют мне почту
    const email = profile.emails && profile.emails.length ? profile.emails[0].value : profile.profileUrl
    const image = profile?.photos?.length ? profile.photos[0].value : '22'

    User.findByEmail(email, function(err, user) {
        if (user) {
            User.updateTokenById(accessToken, user.id, function() {
                return cb(null, { username: accessToken });
            });
        } else {
            const user = new User({
                accessToken,
                title: profile.displayName,
                image,
                email
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

exports.vkontakte = new VKStrategy({
        clientID: '51712994',
        clientSecret: 'xLDAI7gCTym68ovDY5dV',
        callbackURL: process.env.BACKEND_SERVER + '/oauth2/redirect/vkontakte',
    }, findOrCreate
)
