// Server Vars
const nodeDockerPort = process.env.NODE_DOCKER_PORT || '2000'
const nodeExposePort = process.env.NODE_EXPOSE_PORT || '2000'


// DB Vars
const dbHost = process.env.DB_HOST || 'localhost'  // Si no encuentra la variable de entorno, 
// entonces es igual a 'localhost'
const dbName = process.env.DB_NAME || 'contactos'
const dbUser = process.env.DB_USER || 'root'
const dbPassword = process.env.DB_PASSWORD || 'root'
const dbPort = process.env.DB_PORT || 3666


// Session Vars
const userLoginSecretToken = process.env.SECRET_TOKEN_LOGIN || 'token_secreto_login'
const userSessionTime = process.env.USER_SESSION_TIME || 90  // Tiempo en minutos


module.exports = {
    dbHost,
    dbName,
    dbUser,
    dbPassword,
    dbPort,
    userLoginSecretToken,
    userSessionTime,
    nodeDockerPort,
    nodeExposePort
}
