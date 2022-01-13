// Dependencies
const passport = require('passport')

module.exports = {
    login: (req, res) =>{
        res.render('../templates/login.html')
    },
    sign_up: (req, res) =>{
        res.render('../templates/sign_up.html')
    },
    logout: (req, res) =>{
        req.logout()
        res.redirect("/usuarios/login")
    },
    loginAuth: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuarios/login'
    })
}
