const express = require("express");
const Investigacion = require("../models/Investigacion");
const Investigador = require("../models/Investigador");
const Facultad = require("../models/Facultad");

const router = express.Router();

// Obtener todas las investigaciones
router.get("/", async (req, res) => {
    try {
        const investigaciones = await Investigacion.find()
            .populate({ path: "facultad", model: "Facultad" })
            .populate({ path: "investigador_principal", model: "Investigador" })
            .populate({ path: "equipo_investigacion", model: "Investigador" });

        res.json(investigaciones);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener investigaciones", error });
    }
});

// Obtener una investigación por ID
router.get("/:id", async (req, res) => {
    try {
        const investigacion = await Investigacion.findById(req.params.id)
            .populate({ path: "facultad", model: "Facultad" })
            .populate({ path: "investigador_principal", model: "Investigador" })
            .populate({ path: "equipo_investigacion", model: "Investigador" });

        if (!investigacion) {
            return res.status(404).json({ mensaje: "Investigación no encontrada" });
        }
        res.json(investigacion);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la investigación", error });
    }
});

// Crear una nueva investigación
router.post("/", async (req, res) => {
    try {
        const { titulo, anio, duracion_meses, facultad, investigador_principal, equipo_investigacion } = req.body;

        // Verificar si la facultad existe
        const facultadExiste = await Facultad.findById(facultad);
        if (!facultadExiste) {
            return res.status(400).json({ mensaje: "La facultad no existe" });
        }

        // Verificar si el investigador principal existe
        const investigadorExiste = await Investigador.findById(investigador_principal);
        if (!investigadorExiste) {
            return res.status(400).json({ mensaje: "El investigador principal no existe" });
        }

        // Verificar si todos los miembros del equipo existen
        for (let id of equipo_investigacion) {
            const investigador = await Investigador.findById(id);
            if (!investigador) {
                return res.status(400).json({ mensaje: `El investigador con ID ${id} no existe` });
            }
        }

        const nuevaInvestigacion = new Investigacion({
            titulo,
            anio,
            duracion_meses,
            facultad,
            investigador_principal,
            equipo_investigacion
        });

        await nuevaInvestigacion.save();
        res.status(201).json(nuevaInvestigacion);
    } catch (error) {
        res.status(500).json({ mensaje: "Error creando la investigación", error });
    }
});

// Actualizar una investigación por ID
router.put("/:id", async (req, res) => {
    try {
        const investigacionActualizada = await Investigacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!investigacionActualizada) {
            return res.status(404).json({ mensaje: "Investigación no encontrada" });
        }
        res.json(investigacionActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la investigación", error });
    }
});

// Eliminar una investigación por ID
router.delete("/:id", async (req, res) => {
    try {
        const investigacionEliminada = await Investigacion.findByIdAndDelete(req.params.id);
        if (!investigacionEliminada) {
            return res.status(404).json({ mensaje: "Investigación no encontrada" });
        }
        res.json({ mensaje: "Investigación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la investigación", error });
    }
});

module.exports = router;
