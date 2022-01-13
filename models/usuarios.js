module.exports = (sequelize, DataTypes) => {
    return sequelize.define('usuarios', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        user_token: {
            type: DataTypes.STRING(250),
        }
    }, { tableName: 'usuarios' })
}