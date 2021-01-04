module.exports = {

    logueado (req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },
    nologueado (req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    }
};