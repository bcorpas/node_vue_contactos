// Models
const { ContactosM } = require('../../db')


module.exports = {
    getAll: async (req, res) =>{
        const allContactos = await ContactosM.findAll({
            where: {
                'usuarioId': req.user.id
            }
        })
        res.json({ 'response': 'SUCCESS', allContactos })
    },
    getOne: async (req, res) =>{

        const targetContacto = req.params.ContactoID
    
        const contacto = await ContactosM.findOne({
            where: {
                'id': targetContacto,
                'usuarioId': req.user.id
            }
        })
    
        // Si el contacto no existe
        if(!contacto){
            return res.json({ 'response': 'ERROR', 'errors': [{'msg': 'Contacto no existe'}] })
        }
    
        res.json({ 'response': 'SUCCESS', contacto })
    },
    create: async (req, res) =>{
        req.body.usuarioId = req.user.id
        const contacto = await ContactosM.create(req.body)
        res.json({ 'response': 'SUCCESS', contacto })
    },
    update: async (req, res) =>{

        // Se recibe la variable enviada mediante la URN de la request
        const targetContacto = req.params.ContactoID
    
        // Se obtiene el contacto antes de ser modificado
        const old_contacto = await ContactosM.findOne({
            where: {
                'id': targetContacto,
                'usuarioId': req.user.id
            }
        })
    
        // Si el contacto no existe
        if(!old_contacto){
            return res.json({ 'response': 'ERROR', 'errors': [{'msg': 'Contacto no existe'}] })
        }    
    
        // Se modifica el contacto
        await ContactosM.update(req.body, {
            where: { id: targetContacto }
        })
    
        // Se obtiene el contacto después de ser modificado
        const new_contacto = await ContactosM.findByPk(targetContacto)
    
        res.json({ 'response': 'SUCCESS', new_contacto, old_contacto })
    },
    delete: async (req, res) =>{

        const targetContacto = req.params.ContactoID
    
        // Se obtiene el contacto antes de ser eliminado
        const contacto_deleted = await ContactosM.findOne({
            where: {
                'id': targetContacto,
                'usuarioId': req.user.id
            }
        })
    
    
        // Si el contacto no existe
        if(!contacto_deleted){
            return res.json({ 'response': 'ERROR', 'errors': [{'msg': 'Contacto no existe'}] })
        }      
    
        await ContactosM.destroy({
            where: { id: targetContacto }
        })
    
        res.json({ 'response': 'SUCCESS', contacto_deleted })
    }
}