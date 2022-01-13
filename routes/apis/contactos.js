// Routes redirect from ./apis/contactos
// Dependencies
const router = require('express').Router()


// Controller
const contactosController = require('../../controllers/apis/contactosController')


// Routes
// Routes - GET
router.get('/get/all', contactosController.getAll)

router.get('/get/one/:ContactoID', contactosController.getOne)


// Routes - POST
router.post('/create', contactosController.create)


// Routes - PUT
router.put('/modify/:ContactoID', contactosController.update)


// Routes - DELETE
router.delete('/delete/:ContactoID', contactosController.delete)


module.exports = router