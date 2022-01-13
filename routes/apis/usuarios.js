// Routes redirect from ./apis/usuarios
// Dependencies
const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const { body, validationResult } = require('express-validator')

// Models
const { UsuariosM } = require('../../db')


// Controller
const usuariosController = require('../../controllers/apis/usuariosController')


// Routes
// Routes - POST
router.post('/sign_up', [
    body('username', 'Campo usuario requerido').not().isEmpty(),
    body('password', 'Campo contraseña requerido').not().isEmpty()
], usuariosController.sign_up)


router.post('/login', [
    body('usuario', 'Campo usuario requerido').not().isEmpty(),
    body('password', 'Campo contraseña requerido').not().isEmpty()
], async (req, res) =>{

    // Se verifica si hubo errores en la validación de los campos de la request
    const validationsErrors = validationResult(req)
    if(!validationsErrors.isEmpty()){
        return res.json({ 'response': 'ERROR', 'errors': validationsErrors.array() })
    }
    

    // De no haber errores de validación de campos, se verifica si el usuario 
    // del usuario que intenta loguearse (iniciar sesión) existe.
    const usuario = await UsuariosM.findOne({
        where: {
            'usuario': req.body.usuario
        }
    })


    // Si el usuario del usuario que intenta loguearse existe
    if(usuario){

        // Se verifica si la contraseña corresponde a la encriptada de la BD
        const passwords_equal = bcryptjs.compareSync(req.body.password, usuario.password)

        // Si el usuario y contraseña son correctos
        if(passwords_equal){

            // Se crea el token de sesión (token del login del usuario)
            const userToken = 'createToken(usuario)'

            // Se modifica el token en la BD
            usuario.user_token = userToken
            await usuario.save()
            
            // Se devuelve el token
            res.json({ 'response': 'SUCCESS', 'user-token': userToken })

        }else{ 
            res.json({ 'response': 'ERROR', 'errors': [{'msg': 'Usuario o contraseña incorrecto'}] }) 
        }
    }else{ 
        res.json({ 'response': 'ERROR', 'errors': [{'msg': 'Usuario o contraseña incorrecto'}] }) 
    }

})


module.exports = router