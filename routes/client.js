// Routes redirect from ./
// Dependencies
const router = require('express').Router()


// Router files
const usuariosClientRouter = require('./client/usuarios')
const appClientRouter = require('./client/app')


// Routes
// Todas las peticiones que empiecen por /usuarios 
// las envía al archivo en la ruta especificada (./client/usuarios).
router.use('/usuarios', usuariosClientRouter)

// Todas las peticiones que empiecen por / 
// las envía al archivo en la ruta especificada (./client/app).
router.use('/', appClientRouter)


module.exports = router