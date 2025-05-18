const express = require("express");
const Facultad = require("../models/Facultad");

const router = express.Router();

// ✅ Obtener todas las facultades
router.get("/", async (req, res) => {
    try {
        console.log("🔍 Buscando facultades en la base de datos...");
        const facultades = await Facultad.find();

        if (facultades.length === 0) {
            console.warn("⚠ No se encontraron facultades en la base de datos.");
            return res.status(404).json({ mensaje: "No hay facultades registradas" });
        }

        console.log("✅ Facultades encontradas:", facultades);
        res.json(facultades);
    } catch (error) {
        console.error("❌ Error al obtener facultades:", error);
        res.status(500).json({ mensaje: "Error al obtener facultades", error });
    }
});

// ✅ Obtener una facultad por ID
router.get("/:id", async (req, res) => {
    try {
        console.log(`🔍 Buscando facultad con ID: ${req.params.id}`);
        const facultad = await Facultad.findById(req.params.id);

        if (!facultad) {
            console.warn("⚠ Facultad no encontrada.");
            return res.status(404).json({ mensaje: "Facultad no encontrada" });
        }

        console.log("✅ Facultad encontrada:", facultad);
        res.json(facultad);
    } catch (error) {
        console.error("❌ Error al obtener la facultad:", error);
        res.status(500).json({ mensaje: "Error al obtener la facultad", error });
    }
});

// ✅ Crear una nueva facultad
router.post("/", async (req, res) => {
    try {
        console.log("📝 Creando nueva facultad:", req.body);

        const nuevaFacultad = new Facultad(req.body);
        await nuevaFacultad.save();

        console.log("✅ Facultad creada correctamente:", nuevaFacultad);
        res.status(201).json(nuevaFacultad);
    } catch (error) {
        console.error("❌ Error al crear la facultad:", error);
        res.status(400).json({ mensaje: "Error al crear la facultad", error });
    }
});

// ✅ Actualizar una facultad por ID
router.put("/:id", async (req, res) => {
    try {
        console.log(`🔄 Actualizando facultad con ID: ${req.params.id}`);

        const facultadActualizada = await Facultad.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!facultadActualizada) {
            console.warn("⚠ Facultad no encontrada para actualizar.");
            return res.status(404).json({ mensaje: "Facultad no encontrada" });
        }

        console.log("✅ Facultad actualizada correctamente:", facultadActualizada);
        res.json(facultadActualizada);
    } catch (error) {
        console.error("❌ Error al actualizar la facultad:", error);
        res.status(500).json({ mensaje: "Error al actualizar la facultad", error });
    }
});

// ✅ Eliminar una facultad por ID
router.delete("/:id", async (req, res) => {
    try {
        console.log(`🗑 Eliminando facultad con ID: ${req.params.id}`);

        const facultadEliminada = await Facultad.findByIdAndDelete(req.params.id);
        if (!facultadEliminada) {
            console.warn("⚠ Facultad no encontrada para eliminar.");
            return res.status(404).json({ mensaje: "Facultad no encontrada" });
        }

        console.log("✅ Facultad eliminada correctamente:", facultadEliminada);
        res.json({ mensaje: "Facultad eliminada correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar la facultad:", error);
        res.status(500).json({ mensaje: "Error al eliminar la facultad", error });
    }
});

module.exports = router;
