
import express from "express";
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";
import { protect, adminOrSuperAdminOnly } from "../middleware/authmiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 📦 Rutas de propiedades
router.get("/", getProperties);
router.post("/", protect, adminOrSuperAdminOnly, upload.array("imagenes", 10), createProperty);
router.put("/:id", protect, adminOrSuperAdminOnly, updateProperty);
router.delete("/:id", protect, adminOrSuperAdminOnly, deleteProperty);

export default router;
