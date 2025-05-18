const express = require("express");
const Investigador = require("../models/Investigador");
const Facultad = require("../models/Facultad");

const router = express.Router();

// Obtener todos los investigadores con sus facultades
router.get("/", async (req, res) => {
    try {
        const investigadores = await Investigador.find().populate("facultades");
        res.json(investigadores);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener investigadores", error });
    }
});

// Obtener un investigador por ID
router.get("/:id", async (req, res) => {
    try {
        const investigador = await Investigador.findById(req.params.id).populate("facultades");
        if (!investigador) {
            return res.status(404).json({ mensaje: "Investigador no encontrado" });
        }
        res.json(investigador);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el investigador", error });
    }
});

// Crear un nuevo investigador
router.post("/", async (req, res) => {
    try {
        const { facultades } = req.body;

        // Validar que las facultades existan
        for (let facultadId of facultades) {
            const facultadExiste = await Facultad.findById(facultadId);
            if (!facultadExiste) {
                return res.status(400).json({ mensaje: `Facultad con ID ${facultadId} no encontrada` });
            }
        }

        const nuevoInvestigador = new Investigador(req.body);
        await nuevoInvestigador.save();
        res.status(201).json(nuevoInvestigador);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear el investigador", error });
    }
});

// Actualizar un investigador por ID
router.put("/:id", async (req, res) => {
    try {
        const { facultades } = req.body;

        // Validar que las facultades existan
        for (let facultadId of facultades) {
            const facultadExiste = await Facultad.findById(facultadId);
            if (!facultadExiste) {
                return res.status(400).json({ mensaje: `Facultad con ID ${facultadId} no encontrada` });
            }
        }

        const investigadorActualizado = await Investigador.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("facultades");

        if (!investigadorActualizado) {
            return res.status(404).json({ mensaje: "Investigador no encontrado" });
        }
        res.json(investigadorActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el investigador", error });
    }
});

// Eliminar un investigador por ID
router.delete("/:id", async (req, res) => {
    try {
        const investigadorEliminado = await Investigador.findByIdAndDelete(req.params.id);
        if (!investigadorEliminado) {
            return res.status(404).json({ mensaje: "Investigador no encontrado" });
        }
        res.json({ mensaje: "Investigador eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el investigador", error });
    }
});

module.exports = router;
