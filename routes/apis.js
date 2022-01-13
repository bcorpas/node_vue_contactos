// Routes redirect from /apis/
// Dependencies
const router = require('express').Router()


// Middlewares
const { loginIsAuthenticated } = require('../middlewares/login')


// Router files
const contactosApiRouter = require('./apis/contactos')
const usuariosApiRouter = require('./apis/usuarios')


// Routes
// Todas las peticiones que empiecen por /apis/contactos 
// las envía al archivo en la ruta especificada (./apis/contactos).
router.use('/contactos', loginIsAuthenticated, contactosApiRouter)

// Todas las peticiones que empiecen por /apis/usuarios 
// las envía al archivo en la ruta especificada (./apis/usuarios).
router.use('/usuarios', usuariosApiRouter)


module.exports = router