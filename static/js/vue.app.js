class APIsServices{

    // 'http://localhost:2000/apis/contactos/get/all'

    contactosAPIsURL = '/apis/contactos'
    usuariosAPIsURL = '/apis/usuarios'

    // app.sweetAlert('Lo sentimos, ocurrió un error', 'error')
    // return false
    async getAPIResponse(path, request_options={}, pre_path=this.contactosAPIsURL){
        const apiURL = pre_path + path
        const api = await fetch(apiURL, request_options)
        const apiResponse = await api.json()
        

        if(apiResponse['response'] == 'ERROR'){
            let apiErrors = ''
            apiResponse['errors'].forEach(element => {
                apiErrors += '-' + element['msg'] + '<br><br>'
            });
            apiErrors = apiErrors.slice(0, -8)
            app.sweetAlert(apiErrors, 'error')
            
            return false
        }else if(!api.ok){
            app.sweetAlert('Lo sentimos, ocurrió un error', 'error')
            
            return false
        }
        
        return apiResponse
    }


    // Métodos para consumir las APIs de /apis/contactos
    async getAllContactos(app){
        const apiResponse = await this.getAPIResponse('/get/all')
        if(!apiResponse)
            return
        app.contactos = apiResponse['allContactos']
    }


    async createContacto(app, contacto){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contacto)
        }

        const apiResponse = await this.getAPIResponse('/create', requestOptions)
        if(apiResponse)
            app.sweetAlert('Contacto creado', 'success')
        app.resetForm()
    }


    async updateContacto(app, contacto, contactoId){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contacto)
        }

        const apiResponse = await this.getAPIResponse(`/modify/${contactoId}`, requestOptions)
        if(!apiResponse)
            return
        else app.sweetAlert(`Contacto #${contactoId} modificado`, 'success')

        app.resetForm()
    }


    async deleteContacto(app, contactoId){
        const requestOptions = {
            method: 'DELETE'
        }

        const apiResponse = await this.getAPIResponse(`/delete/${app.current_contacto}`, requestOptions)
        if(!apiResponse)
            return
        else app.sweetAlert(`Contacto #${contactoId} eliminado`, 'success')

        app.resetForm()
    }


    // Métodos para consumir las APIs de /apis/usuarios
    async createUsuario(app, usuario){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        }

        const apiResponse = await this.getAPIResponse('/sign_up', requestOptions, this.usuariosAPIsURL)
        if(apiResponse){
            app.sweetAlert('Usuario registrado', 'success')
            app.usuarios_form = {}
        }
    }
}

const appId = '#app'
const app = new Vue({
    el: appId,
    data: {
        apisServices: null,

        form_default_legend: 'Crear Contacto',
        contactos: [],
        contacto_form: {},
        current_contacto: null,

        usuarios_form: {}
    },

    async created(){
        this.apisServices = new APIsServices()
        await this.apisServices.getAllContactos(this)
    },

    methods: {
        // Global methods
        sweetAlert: function(message, type=''){
            // type = 'success' || 'error'

            const sweetAlert = document.createElement('div')
            sweetAlert.innerHTML = message
            sweetAlert.classList.add('sweetAlert')
            sweetAlert.classList.add('active')
            sweetAlert.classList.add(type)

            const appHTMLNode = document.querySelector(appId)
            appHTMLNode.appendChild(sweetAlert)

            setTimeout(() =>{
                sweetAlert.classList.remove('active')
                setTimeout(() =>{
                    sweetAlert.remove()
                }, 2000)
            }, 4000)
        },

        // Contactos methods
        resetForm: async function(){
            
            await this.apisServices.getAllContactos(this)

            this.contacto_form = {}

            document.querySelector('#form_legend').innerHTML = this.form_default_legend

            document.querySelector('#fiButton').classList.remove('hidden')
            document.querySelector('#fuButton').classList.add('hidden')
            document.querySelector('#fdButton').classList.add('hidden')
            document.querySelector('#fcButton').classList.add('hidden')

        },
        saveContacto: async function(){
            await this.apisServices.createContacto(this, this.contacto_form)
            await this.apisServices.getAllContactos(this)
            this.resetForm()
        },
        adminContacto: function(contacto){

            this.current_contacto = contacto.id

            this.contacto_form = contacto

            document.querySelector('#form_legend').innerHTML = `Administrar contacto ${contacto.id}`

            document.querySelector('#fiButton').classList.add('hidden')
            document.querySelector('#fuButton').classList.remove('hidden')
            document.querySelector('#fdButton').classList.remove('hidden')
            document.querySelector('#fcButton').classList.remove('hidden')

        },
        updateContacto: async function(){
            await this.apisServices.updateContacto(this, this.contacto_form, app.current_contacto)
            await this.apisServices.getAllContactos(this)
        },
        deleteContacto: async function(){
            await this.apisServices.deleteContacto(this, this.current_contacto)
            await this.apisServices.getAllContactos(this)
        },

        // Usuarios methods
        saveUsuario: async function(){
            await this.apisServices.createUsuario(this, this.usuarios_form)
        },
    }
}) 