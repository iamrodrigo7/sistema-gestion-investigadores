const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const investigadoresRoutes = require("./routes/investigadores");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect("mongodb://host.docker.internal:27017/universidad", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB desde Investigadores"))
.catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// Rutas
app.use("/investigadores", investigadoresRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Microservicio de Investigadores activo");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de Investigadores corriendo en http://localhost:${PORT}`);
});
