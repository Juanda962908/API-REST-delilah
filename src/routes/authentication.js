const express = require('express');
const router = express.Router();

const passport = require('passport');
const { logueado, nologueado } = require('../lib/auth');
 
router.get('/signup', nologueado, (req, res) => {
    res.render('auth/signup');
});

router.get('/signupadmin', nologueado, (req, res) => {
    res.render('auth/signupadmin');
});


router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

router.post('/signupadmin', passport.authenticate('local.signupadmin', {
    successRedirect: '/profile',
    failureRedirect: '/signupadmin',
    failureFlash: true
}));

router.get('/signin', nologueado, (req,res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin'
    })(req, res, next);
    console.log('Login correcto')
});

router.get('/profile', logueado, (req, res) => {
    res.render('profile');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});




module.exports = router;