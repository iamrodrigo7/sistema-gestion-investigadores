const mongoose = require("mongoose");

const InvestigadorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    especialidad: { type: String, required: true },
    gradoAcademico: { type: String, required: true },
    correo: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Correo inválido"],
    },
    telefono: {
        type: String,
        required: true,
        match: [/^\d{8}$/, "El teléfono debe tener 8 dígitos"],
    },
    facultad: { type: String, required: true }
}, { collection: "investigadores" });

module.exports = mongoose.model("Investigador", InvestigadorSchema);
