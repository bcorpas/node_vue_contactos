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

const UsuariosModel = require('./models/usuarios')
const UsuariosM =  UsuariosModel(sequelizeConnection, DataTypes)


// Relationships
const contactosUsuarioRL = UsuariosM.hasMany(ContactosM, { 
    foreignKey: {
      name: 'usuarioId',  // Nombre del campo foráneo
      allowNull: false
    },
    as: 'contactosUsuarioRL',  // Alias para la relación, para cuando alguno de 
    // los dos modelos necesite acceder a la relación.
    // También será el nombre del diccionario cuando se haga una 
    // consulta para traer los objetos relacionados mediante include.
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})  // Relación 1:M (UsuariosM:ContactosM)


// DB Synchronization
async function dbSynchronization(){
    await sequelizeConnection.sync({ alter: false })
    console.log('[[ DB Synchronization success ]]')
}
dbSynchronization()


module.exports = {
    ContactosM,
    UsuariosM,
    contactosUsuarioRL,
}



