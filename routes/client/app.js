// Routes redirect from ./usuarios
// Dependencies
const router = require('express').Router()


// Middlewares
const { loginIsAuthenticated } = require('../../middlewares/login')


// Controller
const appController = require('../../controllers/client/appController')


// Routes
// Routes - GET
router.get('/', loginIsAuthenticated, appController.index)


module.exports = router