// Dependencies
const { Sequelize, DataTypes } = require('sequelize');
const { dbHost, dbName, dbUser, dbPassword, dbPort} = require('./env.vars')


// DB Connection
const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost, 
    dialect: 'mariadb',
    dialectOptions: {
        port: dbPort
    }
})


// Models
const ContactosModel = require('./models/contactos')
const ContactosM =  ContactosModel(sequelizeConnection, DataTypes)


// DB Synchronization
async function dbSynchronization(){
    await sequelizeConnection.sync({ alter: true })
    console.log('[[ DB Synchronization success ]]')
}
dbSynchronization()


module.exports = {
    ContactosM
}



