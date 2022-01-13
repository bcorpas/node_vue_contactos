// Routes redirect from ./usuarios
// Dependencies
const router = require('express').Router()


// Controller
const usuariosController = require('../../controllers/client/usuariosController')


// Routes
// Routes - GET
router.get('/login', usuariosController.login)

router.get('/sign_up', usuariosController.sign_up)

router.get('/logout', usuariosController.logout)


// Routes - POST
router.post('/login/auth', usuariosController.loginAuth)


module.exports = router