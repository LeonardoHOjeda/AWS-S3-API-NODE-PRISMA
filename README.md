# AWS-S3-API (Node y TypeScript)

El proyecto consiste en crear una API (endpoint o microservicio) que se conecte a un bucket de AWS S3.

Los usuarios podrán enviar información a través de esta API y recibirán como respuesta una URL que les permitirá acceder al archivo correspondiente en el bucket.

La API se encargará de autenticar y autorizar a los usuarios, validar los datos recibidos y utilizar los servicios de AWS para interactuar de forma segura con el bucket de S3.

Una vez que se cargue el archivo en el bucket, la API generará una URL de acceso única y segura para que los usuarios puedan descargar el archivo.

# Instalación del proyecto

## Descargar Repositorio
### HTTPS
`git clone https://github.com/LeonardoHOjeda/AWS-S3-API-NODE-PRISMA.git`

### Github CLI
`gh repo clone LeonardoHOjeda/AWS-S3-API-NODE-PRISMA`

## Instalar dependencias de desarrollo

Una vez descargado el repositorio, ejecutar el siguiente comando
`npm install`

## Comando para correr el proyecto en **MODO DESARROLLO**

`npm run dev`

# Tecnologías y Librerías Instaladas

- [aws-sdk](https://www.npmjs.com/package/aws-sdk)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-fileupload](https://www.npmjs.com/package/express)
- [stream](https://www.npmjs.com/package/express)
- [module-alias](https://www.npmjs.com/package/module-alias)
- [tsc-watch](https://www.npmjs.com/package/tsc-watch)
- [typescript](https://www.npmjs.com/package/typescript)

## ESLint usado

- [ts-standard](https://www.npmjs.com/package/ts-standard)

## ORM
- [prisma](https://www.npmjs.com/package/ts-standard)

## Prettier
- [ts-prettier-plugin-prisma](https://www.npmjs.com/package/ts-standard)

