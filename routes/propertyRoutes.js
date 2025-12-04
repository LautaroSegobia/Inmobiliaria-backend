
import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

// Crear propiedad
router.post("/", createProperty);

// Obtener todas las propiedades
router.get("/", getAllProperties);

// Obtener propiedad por ID
router.get("/:id", getPropertyById);

// Actualizar propiedad
router.put("/:id", updateProperty);

// Eliminar propiedad
router.delete("/:id", deleteProperty);

export default router;
