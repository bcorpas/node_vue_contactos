# node_vue_contactos [1.0.0]

---
node_vue_contactos es una aplicación web sencilla para gestionar una libreta de contactos con propósitos educativos.

La aplicación se encuentra contenerizada mediante docker-compose (version 3), y el stack de tecnologías es 100% de lenguaje javascript. El backend se trabaja con node.js, el frontend con vue.js y, el ORM a cargo es Sequelize con una base de datos mariadb.


## Instalación
---
- Descarga e instala [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Instala el paquete [docker-compose](https://docs.docker.com/compose/install/)
- Descarga este repositorio y abre la terminal de comandos en la raíz del proyecto
- Para finalizar, ejecuta el comando:
    ```bash
    docker-compose build
    ```



## Ejecución
---
- Una vez instalada, para ejecutar la aplicación se debe abrir la terminal de comandos en la raíz del proyecto y ejecutar el comando:
    ```bash
    docker-compose up
    ```
Por defecto, la aplicación se ejecuta en el puerto 80 de [su servidor local](http://localhost/).




## Configuración
---
No es necesario configurar la aplicación para que esta funcione, una vez instalada, esta cuenta con las configuraciones necesarias para su correcto funcionamiento.

**CONTENEDOR DE LA BASE DE DATOS**
> Al momento de instalar la aplicación; las base de datos es creada y configurada automáticamente mediante las variables de entorno almacenadas en el archivo [/.env](https://github.com/bcorpas/node_vue_contactos/blob/master/.env) del proyecto.

> MARIADB_ROOT_PASSWORD
> Contraseña del usuario root creado por defecto.

> DB_HOST
> Servidor de la base de datos. 
> Por defecto se encuentra DB_HOST=mariadb_db, esto es debido a que el servicio por el cual se ejecuta la base de datos tiene como nombre mariadb_db, para cambiar esto; se debe editar el nombre del servicio del contenedor de la base de datos en el archivo [/docker-compose.yml](https://github.com/bcorpas/node_vue_contactos/blob/master/docker-compose.yml).

> DB_PORT
> Puerto de conexión a la base de datos.
> Debe coincidir con la variable de entorno MARIADB_DOCKER_PORT para que el servidor del proyecto se pueda conectar a la base de datos del proyecto, ya que este es el puerto por donde se ejecuta la base de datos dentro de su contenedor.

> DB_USER
> Usuario de la base de datos.
> Debe ser DB_USER=root para que se pueda conectar a la base de datos del proyecto, ya que esta se crea con el usuario root por defecto.

> DB_PASSWORD
> Contraseña del usuario de la base de datos.
> Debe coincidir con la variable de entorno MARIADB_ROOT_PASSWORD para que se pueda conectar a la base de datos del proyecto, ya que esta es la contraseña creada por defecto para el usuario root (creado por defecto).

> DB_NAME
> Nombre de la base de datos creada por defecto.


> MARIADB_DOCKER_PORT
> Puerto por donde se ejecuta la base de datos dentro de su contenedor (servidor/servicio).

> MARIADB_EXPOSE_PORT
> Puerto por el cual se podrá acceder a la base de datos del proyecto de manera local (dentro de nuestro equipo/PC/máquina).

---

**CONTENEDOR DEL SERVIDOR**
> Para cambiar el puerto por donde se ejecuta (sirve) el servidor node.js dentro de su contenedor (servidor/servicio), se debe modificar la variable de entorno NODE_DOCKER_PORT dentro del archivo  [/.env](https://github.com/bcorpas/node_vue_contactos/blob/master/.env) del proyecto, así mismo, para cambiar el puerto por el cual se ejecuta el servidor node.js de manera local (desde nuestro equipo/PC/máquina), se debe modificar NODE_EXPOSE_PORT.

> Para elegir la base de datos a la cual se va a conectar el proyecto, se deben modificar los parámetros de conexión en el archivo [/db.js](https://github.com/bcorpas/node_vue_contactos/blob/master/db.js) del proyecto tal que:
```js
// DB Connection
const sequelizeConnection = new Sequelize(
    'nombre de la base de datos', 
    'usuario de la base de datos', 
    'contraseña de la base de datos', 
    {
        host: 'servidor de la base de datos', 
        dialect: 'mariadb',  // Tipo de base de datos, más detalles en: 
        // https://sequelize.org/master/manual/dialect-specific-things.html
        dialectOptions: {
            port: 'puerto de la base de datos'
        }
    }
)

```
>

