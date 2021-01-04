const pool = require('../database')



module.exports = {

        async isAdmin (req, res, next) {
            const admincheck = await pool.query('SELECT * FROM usuarios WHERE ID = ? AND Role = "admin"', [req.user.ID]);
            if (admincheck != "") {
                return next();
            } else {
                return res.redirect('/profile');
            }
            
        }

}
