# Se especifica la versión de la imagen de node
FROM node:alpine3.15

# Se crea un directorio en la imagen de node, con -p se crea la 
# ruta completa si no existe.
RUN mkdir -p /usr/src/app

# Nos movemos dentro de la imagen al directorio anteriormente creado
WORKDIR /usr/src/app

# Todos los archivos (en el directorio actual de nuestra PC) que 
# empiecen con package y terminen en .json, serán copiados dentro  
# de la imagen en la ruta actual.
COPY package*.json ./

# Se instalan todas las dependencias dentro del archivo package.json
RUN npm install

# Se copian todos los archivos (en el directorio actual de nuestra PC) al 
# directorio (ruta) actual de la imagen.
COPY . .

# La imagen se va a ejecutar por este puerto.
# Esto no hace el mapeo del puerto, solo es para 
# informar que por este puerto se ejecuta el contenedor.
EXPOSE 2000

# Se ejecuta este comando para que una vez que el contenedor de la imagen sea 
# levantado (iniciado, encendido etc) se inicie el servidor de node.
# El comando npm start ejecuta un comando personalizado en el archivo package.json el 
# cual es el responsable de iniciar el servidor (node ./index.js).
CMD ["npm", "run", "dev"]



# La diferencia entre las instrucciones CMD y RUN, es que cada comando RUN conforma 
# la serie de comandos necesarios para iniciar el contenedor, y CMD sería el comando 
# que inicia el contenedor como tal.
# Si se utilizan varias instrucciones CMD, entonces solo se ejecutará la última.