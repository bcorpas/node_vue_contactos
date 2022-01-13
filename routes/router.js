// Routes redirect from ./
// Dependencies
const router = require('express').Router()


// Router files
const apisRouter = require('./apis')
const clientRouter = require('./client')


// Routes
// Todas las peticiones cuya URN empiecen por /apis/ las envía al 
// enrutador en el archivo en la ruta de apisRouter.
router.use('/apis', apisRouter)

// Todas las peticiones cuya URN empiecen por / las envía al 
// enrutador en el archivo en la ruta de clientRouter.
router.use('/', clientRouter)


module.exports = router