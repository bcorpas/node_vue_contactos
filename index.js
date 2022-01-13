// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')


// Env vars file
const { nodeDockerPort, nodeExposePort, userLoginSecretToken } = require('./env.vars')


// Login middleware
const { loginAuth, loginSerialize, loginDeserialize } = require('./middlewares/login')


const app = express()


// Settings for HTML render and static files
app.use(express.static('static'))

app.set('views', __dirname + '/templates');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))  // Para recibir los 
// datos enviados por formularios.
app.use(cookieParser(userLoginSecretToken))  // El token secreto para las cookies
app.use(expressSession({
    secret: userLoginSecretToken,  // El token secreto para la sesión 
    resave: true,  // Se guarda la sesión en cada petición 
    saveUninitialized: true  // Cuando se inicie una sesión en una petición, se 
    // guarda automáticamente.
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(loginAuth))  // Función donde se autentica (inicia sesión) el usuario
passport.serializeUser(loginSerialize)  // Función donde se serializa la información del usuario 
// que inició sesión.
passport.deserializeUser(loginDeserialize)  // Función donde se deserializa la información del 
// usuario que inició sesión.


// Router files
const mainRouter = require('./routes/router')


// Routes
// Todas las peticiones las envía al router principal
app.use('/', mainRouter)


// App run
app.listen(nodeDockerPort, () => console.log(`[[ Server on port ${nodeExposePort} ]]`))



