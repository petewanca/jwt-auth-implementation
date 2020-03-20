const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const { secret } = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, (jwtPayload, done) => {
            User.findOne({ _id: jwtPayload.id })
                .then((user) => {
                    user ? done(null, user) : done(null, false);
                })
                .catch((err) => {
                    return done(err, false);
                });
        })
    );
};

// PASSPORT USES THE JWT STRATEGY, TAKES IN THE OPTIONS YOU SET
// IN THE OPTS OBJECT, AND USES THOSE SPECFICIATIONS AND YOUR
// SECRET KEY TO AUTHORIZE WHEN YOU USE PASSPORT AS ROUTE MIDDLEWARE
