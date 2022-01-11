// Dependencies
const router = require('express').Router()


// Controller
const indexController = require('../controllers/client/indexController')


// Routes redirect from ./
router.get('/', indexController.index)


module.exports = router