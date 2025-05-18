const express = require("express");
const Investigador = require("../models/Investigador");

const router = express.Router();

// ✅ Obtener todos los investigadores
router.get("/", async (req, res) => {
    try {
        const investigadores = await Investigador.find();
        res.json(investigadores);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener investigadores", error });
    }
});

// ✅ Obtener un investigador por ID
router.get("/:id", async (req, res) => {
    try {
        const investigador = await Investigador.findById(req.params.id);
        if (!investigador) {
            return res.status(404).json({ mensaje: "Investigador no encontrado" });
        }
        res.json(investigador);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el investigador", error });
    }
});

// ✅ Crear un nuevo investigador
router.post("/", async (req, res) => {
    try {
        const nuevo = new Investigador(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear el investigador", error });
    }
});

// ✅ Actualizar un investigador por ID
router.put("/:id", async (req, res) => {
    try {
        const actualizado = await Investigador.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!actualizado) {
            return res.status(404).json({ mensaje: "Investigador no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el investigador", error });
    }
});

// ✅ Eliminar un investigador por ID
router.delete("/:id", async (req, res) => {
    try {
        const eliminado = await Investigador.findByIdAndDelete(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ mensaje: "Investigador no encontrado" });
        }
        res.json({ mensaje: "Investigador eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el investigador", error });
    }
});

module.exports = router;
