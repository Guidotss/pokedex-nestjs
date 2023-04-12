<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clona el repositorio
2. Ejecutar
  ```bash
  $ npm install
  # or 
  $ yarn install
  ```

3. Tener Nest CLI instalado
  ```bash
  $ npm i -g @nestjs/cli
  # or
  $ yarn global add @nestjs/cli
  ```

4. Levantar la base de datos
  ```bash
  $ docker-compose up -d
  ```
5. Clonar el archivo `.env.template` y renombrarlo a `.env`
6. Llenar las variables de entorno en el archivo `.env`
7. Ejecutar la aplicacion en modo desarrollo
  ```bash
  $ npm run start:dev
  # or
  $ yarn start:dev
  ```

8. Reconstruir la base de datos
  ```bash
  http://localhost:3000/api/v2/seed
  ```


## Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)


## Licencia
  Nest is [MIT licensed](LICENSE).


