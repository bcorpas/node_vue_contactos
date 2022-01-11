class APIsServices{

    // 'http://localhost:2000/apis/contactos/get/all'

    contactosAPIsURL = '/apis/contactos'


    async getAPIResponse(path, request_options={}){
        const apiURL = `${this.contactosAPIsURL}${path}`
        const api = await fetch(apiURL, request_options)
        const apiResponse = api.json()

        if(apiResponse['response'] == 'ERROR'){
            app.sweetAlert(apiResponse['errors']['msg'], 'error')
            return false
        }
        
        return apiResponse
    }


    // Métodos para consumir las APIs
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
}

const appId = '#app'
const app = new Vue({
    el: appId,
    data: {
        form_default_legend: 'Crear Contacto',
        apisServices: null,
        contactos: [],
        contacto_form: {},
        current_contacto: null
    },

    async created(){
        this.apisServices = new APIsServices()
        await this.apisServices.getAllContactos(this)
    },

    methods: {
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
        }
    }
}) 