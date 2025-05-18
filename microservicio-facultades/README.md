# Microservicio de Facultades

Este microservicio forma parte del sistema de gestión académica de la Universidad Da Vinci. Su función principal es administrar la información relacionada con las facultades de la universidad.

---

## Características

- Permite crear, consultar, actualizar y eliminar facultades.
- Se conecta a una base de datos MongoDB compartida entre microservicios.
- Desarrollado con Node.js, Express.js y Mongoose.
- Contenedor Docker para despliegue independiente.

---

## Requisitos para ejecución

- Docker y Docker Compose instalados.
- MongoDB accesible en la red del contenedor.
- Puerto expuesto: `5000`

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/iamrodrigo7/microservicio-facultades.git
cd microservicio-facultades

---

## Pruebas postman
### Obtener todas las facultades

- Método: `GET`  
- URL: `http://localhost:5000/facultades`  
- Respuesta esperada:

```json
[
  {
    "_id": "67f88e9e483035ffb0f78c93",
    "nombre": "Facultad de Ingeniería",
    "siglas": "FI",
    "carreras": [
      "Ingeniería en Sistemas",
      "Ingeniería Civil"
    ],
    "decano": "Dr. Juan Pérez",
    "telefono": "22334455",
    "correo": "fi@universidad.edu.gt",
    "__v": 0
  }
]

### Agregar nueva facultad

Método: POST

URL: http://localhost:5000/facultades

Body → raw → JSON:

json
Copiar
Editar
{
  "nombre": "Facultad de Ciencias",
  "siglas": "FC",
  "carreras": [
    "Biología",
    "Química"
  ],
  "decano": "Dra. Laura Méndez",
  "telefono": "22446688",
  "correo": "fc@universidad.edu.gt"
}
Respuesta esperada:

json
Copiar
Editar
{
  "_id": "67f8c123456789abcdef0123",
  "nombre": "Facultad de Ciencias",
  "siglas": "FC",
  "carreras": [
    "Biología",
    "Química"
  ],
  "decano": "Dra. Laura Méndez",
  "telefono": "22446688",
  "correo": "fc@universidad.edu.gt",
  "__v": 0
}


## Autor
Rodrigo Avila 
202104215
Universidad Da Vinci
