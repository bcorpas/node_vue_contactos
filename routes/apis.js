// Dependencies
const router = require('express').Router()


// Routes redirect from /apis/

// Todas las peticiones que empiecen por /apis/contactos 
// las envía al archivo en la ruta especificada (./apis/contactos).
const contactosApiRouter = require('./apis/contactos')
router.use('/contactos', contactosApiRouter)

module.exports = router