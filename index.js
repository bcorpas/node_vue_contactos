// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const apisRouter = require('./routes/apis')
const clientRouter = require('./routes/client')
const { nodeDockerPort, nodeExposePort } = require('./env.vars')

const app = express()


// Settings for HTML render and static files
app.use(express.static('static'))

app.set('views', __dirname + '/templates');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Routes
// Todas las peticiones cuya URN empiecen por /apis/ las envía al 
// enrutador en el archivo en la ruta de apisRouter.
app.use('/apis', apisRouter)

// Todas las peticiones cuya URN empiecen por / las envía al 
// enrutador en el archivo en la ruta de clientRouter.
app.use('/', clientRouter)


// App run
app.listen(nodeDockerPort, () => console.log(`[[ Server on port ${nodeExposePort} ]]`))



