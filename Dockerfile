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

# La imagen se va a ejecutar por este puerto
EXPOSE 2000

# Se ejecuta este comando para que una vez que el contenedor de la imagen sea 
# levantado (iniciado, encendido etc) se inicie el servidor de node.
CMD ["npm", "start"]
