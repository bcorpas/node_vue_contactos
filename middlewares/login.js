const { UsuariosM } = require('../db')
const bcryptjs = require('bcryptjs')

module.exports = {
    loginAuth: async function(username, password, done){

        // De no haber errores de validación de campos, se verifica si el username 
        // del usuario que intenta loguearse (iniciar sesión) existe.
        const usuario = await UsuariosM.findOne({
            where: {
                'username': username
            }
        })

        // Si el usuario del usuario que intenta loguearse existe
        if(usuario){
            // Se verifica si la contraseña corresponde a la encriptada de la BD.
            // Recibe como 1er parámetro la contraseña que ingresó el usuario, 
            // y como 2do parámetro la contraseña encriptada con bcryptjs.
            const passwords_equal = bcryptjs.compareSync(password, usuario.password)

            // Si la contraseña es correcta.
            if(passwords_equal)
                return done(null, usuario)
            // Si la contraseña NO es correcta
            return done(null, false)
            // done() recibe como 1er parámetro un mensaje de error en 
            // caso de que haya ocurrido, y como 2do parámetro recibe 
            // false si es que no las credenciales de inicio de sesión fueron 
            // incorrectas, y cualquier valor diferente de true en caso contrario.
        }else{ return done(null, false) }
    },
    // Serializar es tomar el campo único de un grupo de datos, 
    // deserializar es tomar el campo único resultante de la 
    // serialización y con él obtener los datos relacionados a este.
    loginSerialize: function(user, done){
        // El parámetro user es el diccionario con la información 
        // del usuario logueado que se le pasó al done() del login (en 
        // loginAuth).
        done(null, user.id)  // Cuando se hizo el login en loginAuth, 
        // el done() recibió como 2do parámetro un diccionario con la 
        // información del usuario logueado. Este done recibe de nuevo en 
        // el primer parámetro un error si es que hubo, y en el 2do parámetro 
        // recibe qué campo del diccionario que devolvió el done() del login (en 
        // loginAuth) es su identificador único.
    },
    loginDeserialize: async function(id, done){
        // El parámetro id es el identificador único que se le pasó al 
        // done() del loginSerialize.
        const usuario = await UsuariosM.findByPk(id)
        done(null, usuario)
        // Se busca el usuario en la BD y se devuelve así como 
        // se devolvió en el done() del login (en loginAuth).
    },
    loginIsAuthenticated: async function(req, res, next){
        if(req.isAuthenticated())
            return next()
        res.redirect('/usuarios/login')
    },
}