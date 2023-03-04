# backend-ecommerce

---

Proyecto final de [Coderhouse](https://www.coderhouse.com/) para el curso de Programación backend

## Requisitos

- API restful para gestionar productos, carritos y órdenes de compra
- Rutas protegidas mediante [Jason Web Tokens](https://jwt.io/) expirables
- Registro e inicio de sesión por email y contraseña encriptada
- Almacenamiento de datos en [Mongo Atlas](https://www.mongodb.com/atlas)
- Canal de chat basado en websockets con [Socket.io](https://socket.io/) para atención de consultas
- Arquitecura del servidor por capas (Modelo-Vista-Controlador) con patrones de D.T.O. y Abstract Factory
- Utilización de motor de plantillas [Handlebars](https://handlebarsjs.com/)
- Envío de correo electrónico a clientes con de talle de orden de compra mediante [Nodemailer](https://nodemailer.com/about/)

## Dependencias utilizadas

- bcryptjs
- dotenv
- express
- express-validator
- express-handlebars
- jsonwebtoken
- mongodb
- mongoose
- nodemailer
- socket.io
- yargs
