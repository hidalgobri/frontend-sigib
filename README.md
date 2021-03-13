# Paso para levantar aplicación fullstack


## Arquitectura

![image](https://user-images.githubusercontent.com/50051312/111022678-3e69e500-83a2-11eb-9928-c1d2fcda729f.png)

## Levantar nuestra intancia EC2

* ingresar a la consola de AWS
* Lanzar la instancia EC2 y descarga el nuevo par de claves

## Ingreso a instancia EC2
* Descargar putty client y putty gen
* [Puty y putty gen](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
* Copiar IP pública de la instancia
* Abrir el putty gen para generar la clave con la llave publica esto lo realiza por general las conexiones SSH.
* Abrir putty client para ingreso a instancia
* Se carga la ip y la llave privada generada 
* El usuario es **ec2-user** y la clave es la puesta en el **puttygen**.


## Instalación de ambiente de app
* instalación de **git**
	*  `sudo yum install git`
* instalación de **nodejs**
  	*  `curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -`
  	* `sudo yum install nodejs`

* instalación de **nestjs**
	*  `sudo npm i -g @nestjs/cli`

* instalación de **pm2**
	*  `sudo npm install pm2 -g`
	
## Clonar repos de backend
* Clonar backend
	* [sistema sigib backend](https://github.com/crisjc6/sigib.git)
 * Comando `git clone https://github.com/crisjc6/sigib.git`
 * ingresar con  **cd** hasta la carpeta del backend.
 * instalación de dependencias comando:
	 * `npm i`

## Creación de base de datos RDS
* Ingresar a la consola de AWS e ir a RDS 
* Crear la base de datos Mysql
* Descargar el cliente sql **Heidi sql**
* Iniciar el cliente heidisql y crear la base **sigib**+
* Copias las credenciales y el endpoint en el heidi 
* Creamos la base de datos **sigib**

## Cambios de variables proyecto backend

* Modificar las variables de entorno
* ubicacion `backend-sigib/src/environment`
* archivo `config.ts`
* Modificamos el host, username, password, database	con el de la base de RDS.
* Nos ubicamos a la altura de package.json
* Modificamos la ip del backend 
* Contruimos el proyecto una vez comando `nest build`
* Verificar que la base tenga los permisos a ese puerto desde cualquier ip
* Verificar la creación de los datos de prueba del **config.ts**.
* * levantamos el proyecto comando 
	* `npm run start:dev`
* Registros creados correctamente
* Paramos el servidor
* Modificamops el config para no crear los datos de prueba
* Revisamos en la base los datos creados

## Duplicar AMI
* Ir a consola AWS
* Creación de AMI de la instancia
* Ejecución de la nueva AMI
* Seleccionamos el grupo de seguridad de la anterior instancia.
* Finaliza la creación de las dos instancias.

## Creación de demonio para levantar proyecto
* Ingresamos con putty a las dos maquinas
* Ubicamos en la parte del proyectos backend altura de package.json
* comando `pm2 start dist/backend-sigib/src/main.js`
* Probamos que las dos este disponibles 
* parar `pm2 stop "nombre-app"`
* restart `pm2 restart "nombre-app"`
* probar en ip:8080/usuario
* Este puerto debe estar habilitado en segurity group



## Crear balanceador de carga
* Ir a aws console
* Seleccionamos crear load balancer
	* nomre
	* puerto del q esta la instancia 8080
	* seguridad de grupo ingual q la instancia
	* Configuramos la comprobación de estado
	* Probar balanceador de carga
	* agregar el 80 a nuestro segurity group
	* Load Balancer funcionando
	* Copiar el end point

## Deploy Frontend en Amplify

* Ir a repo [frontend](https://github.com/crisjc6/frontend-sigib.git)
* Le damos en fork para que se añada a nuestros proyectos
* abrimos AWS console
* Clic en Amplify
* Cambios el endpoint de nuestro backend
* Cambios los environment del frontend con el load balancer sin / al final
* Al final damos en crear y lanzar
* Esperamos que se complete el pipeline de nuestro frontend
* Abrimos el endpoint de nuestra app
* habilitamos las comunicaciones insegura de nuestro navegador ya que nuestro balancerador no tiene un certificado seguro ssl para HTTPS
* con el usuario "1104125883" y la contraseña "1104125883" podemos probar los diferentes roles de la app 

Se completa la arquitectura final de la app

Este readme, videos, docs, y archivos estaran disponibles en el siguiente drive
[drive grupo](https://drive.google.com/drive/folders/1-KGxeA1d2cWyv-HeGrg7rR7OgWSwbQQy?usp=sharing)
