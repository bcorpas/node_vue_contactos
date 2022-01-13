// Models
const { UsuariosM } = require('../../db')
const bcryptjs = require('bcryptjs')
const { body, validationResult } = require('express-validator')

module.exports = {
    sign_up: async (req, res) =>{

        const validationsErrors = validationResult(req)  // Se obtienen los errores de 
        // validación de los campos validados con express-validator.
        // Las validaciones en este caso son las hechas con el método body en el array 
        // enviado como 2do parámetro. El método body hace las validaciones a los campos 
        // que pertenecen al body de la request, estos campos son las variables enviadas desde 
        // formularios con el método POST.
    
    
        // Si validationsErrors no está vacío, significa que hubieron errores de validación, 
        // por lo cual se retornan los errores.
        if(!validationsErrors.isEmpty()){
            return res.json({ 'response': 'ERROR', 'errors': validationsErrors.array() })
        }
        
    
        // Si no hubieron errores de validación, se toma el campo password del body 
        // de la request y se encripta (el 2do parámetro es el salt), se encripta 
        // directamente el campo de la request para que luego al insertar el usuario 
        // en la BD con el ORM Sequelize, se envíe simplemente el body de la request 
        // que ya contiene los campos de la tabla.
        req.body.password = bcryptjs.hashSync(req.body.password, 11)
        // Luego, se inserta el usuario en la BD enviando solo el body de la request, 
        // como el nombre de los campos del body de la request tienen el mismo nombre 
        // que los campos del modelo (la tabla), entonces no es necesario especificar 
        // el valor de cada campo del modelo. Por eso se encripta directamente el campo 
        // password del body de la request.
        const user = await UsuariosM.create(req.body)
    
        res.json({ 'response': 'SUCCESS', user })
    
    }
}