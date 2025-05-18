# Sistema de Gestión de Investigadores y Facultades

Este proyecto es un sistema desarrollado con **React Native (Expo)** para el frontend y **Node.js con Express + MongoDB** en dos microservicios para el backend.

## 📁 Estructura del Proyecto

```
frontend-microservicios/
├── microservicio-facultades/        ← Microservicio backend para Facultades
├── microservicio-investigadores/    ← Microservicio backend para Investigadores
├── src/                             ← Código fuente del frontend en React Native
├── App.tsx
├── package.json
├── README.md                        ← Este archivo
└── ...
```

---

## ⚙️ Tecnologías utilizadas

- **Frontend:** React Native (con Expo)
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB
- **Lenguaje:** TypeScript

---

## 🎯 Funcionalidades

Este sistema permite administrar **facultades** e **investigadores**, cubriendo los siguientes procesos:

### 🔹 Microservicio de Facultades
- Agregar una nueva facultad
- Editar los datos de una facultad
- Eliminar una facultad
- Listar todas las facultades

### 🔹 Microservicio de Investigadores
- Agregar un nuevo investigador
- Editar los datos de un investigador
- Eliminar un investigador
- Listar todos los investigadores

---

## 🧭 Navegación

La aplicación muestra dos secciones principales accesibles desde el menú inferior de navegación:

- **Investigadores**: donde se pueden gestionar investigadores.
- **Facultades**: donde se pueden gestionar facultades.

Cada listado permite editar o eliminar elementos fácilmente desde la interfaz.

---

## 🚀 ¿Cómo ejecutar el proyecto?

1. Clona el repositorio:
```bash
git clone https://github.com/iamrodrigo7/sistema-gestion-investigadores.git
cd frontend-microservicios
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el proyecto con Expo:
```bash
npx expo start
```

4. Asegúrate de tener ambos microservicios corriendo en puertos 5000 y 5001.

---

## 👤 Autor

Rodrigo Avila (usuario de GitHub: [iamrodrigo7](https://github.com/iamrodrigo7))  
Fecha de documentación: 18/05/2025
