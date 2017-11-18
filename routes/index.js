var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var router = express.Router();

var loginUser = {
    id: 1,
    username: 'admin',
    password: 'admin'
};
passport.use(new Strategy(
    function (username, password, done) {
        if (username == loginUser.username && password == loginUser.password) {
            return done(null, loginUser);
        }
        else {
            return done(null, false);
        }
    }
));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    if (id == loginUser.id) {
        return done(null, loginUser);
    }
    else {
        return done(null, false);
    }
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Login'});
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), function (req, res) {
    res.redirect('/products');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
