# microservicio-investigadores

# Manual de Uso y Documentación Técnica - Microservicio de Investigadores

## Descripción General
Este microservicio forma parte del sistema de gestión académica de la Universidad Da Vinci. Su objetivo principal es permitir el registro, actualización, consulta y eliminación de investigadores dentro de la base de datos compartida del sistema.

---

## Tecnologías Utilizadas
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Docker**

---

## Instalación y Ejecución del Microservicio

### 1. Clonar el repositorio
```bash
git clone https://github.com/iamrodrigo7/microservicio-investigadores.git
cd microservicio-investigadores
```

### 2. Crear archivo `.env`
En la raíz del proyecto, crea un archivo `.env` con la siguiente línea:
```env
MONGO_URI=mongodb://mongodb_unico:27017/universidad
```

### 3. Ejecutar con Docker
```bash
docker-compose up --build
```

Asegúrate de haber creado la red externa previamente con:
```bash
docker network create red-microservicios
```

El microservicio estará disponible en:  
`http://localhost:5001`

---

## Endpoints Disponibles

| Método | Ruta                    | Descripción                             |
|--------|-------------------------|-----------------------------------------|
| GET    | /investigadores         | Obtener todos los investigadores        |
| GET    | /investigadores/:id     | Obtener un investigador por ID          |
| POST   | /investigadores         | Crear un nuevo investigador             |
| PUT    | /investigadores/:id     | Actualizar información de un investigador |
| DELETE | /investigadores/:id     | Eliminar un investigador                |

---

## Ejemplo de Objeto JSON para POST
```json
{
  "nombre": "Luis Pérez",
  "especialidad": "Biotecnología",
  "gradoAcademico": "Doctorado",
  "correo": "luis.perez@udv.edu.gt",
  "telefono": "22446688",
  "facultad": "Facultad de Ingeniería"
}
```

---

## Pruebas con Postman
## Obtener todos los investigadores

- **Método**: `GET`  
- **URL**: `http://localhost:5001/investigadores`  
- **Descripción**: Devuelve una lista de todos los investigadores registrados.  

### Respuesta:

```json
[
  {
    "_id": "67f893c6739b8acd4c4f8872",
    "nombre": "Dra. Ana Martínez",
    "especialidad": "Inteligencia Artificial",
    "gradoAcademico": "Doctorado",
    "correo": "ana.martinez@universidad.edu.gt",
    "telefono": "22334455",
    "facultad": "67f88e9e483035ffb0f78c93",
    "__v": 0
  }
]

---

## Consideraciones de Seguridad
- Validaciones de datos en los modelos
- Control de errores con respuestas claras
- Uso de CORS habilitado para desarrollo

---

## Estructura del Proyecto
```
microservicio-investigadores/
├── models/
│   └── Investigador.js
├── routes/
│   └── investigadores.js
├── .env
├── Dockerfile
├── docker-compose.yml
├── server.js
└── README_investigadores.md
```

---

## Estado del Microservicio
El servicio está **funcional y desplegado correctamente** en su contenedor Docker. Se conecta a la base de datos MongoDB compartida (`mongodb_unico`) y expone sus rutas en el puerto `5001`.

---

## Autor
Rodrigo Avila 
202104215
Universidad Da Vinci

