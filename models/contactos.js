module.exports = (sequelize, DataTypes) => {
    return sequelize.define('contactos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombres: {
            type: DataTypes.STRING,
        },
        apellidos: {
            type: DataTypes.STRING,
        },
        correo: {
            type: DataTypes.STRING,
        },
        celular: {
            type: DataTypes.STRING,
        },
        telefono: {
            type: DataTypes.STRING,
        },
        direccion: {
            type: DataTypes.STRING,
        }
    }, { tableName: 'contactos' })
}