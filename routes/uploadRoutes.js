
import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect, adminOrSuperAdminOnly } from "../middleware/authmiddleware.js";
import { uploadFiles, deleteFile } from "../controllers/uploadController.js";

const router = express.Router();

//  Subir archivos (solo admin o superAdmin)
router.post("/", protect, adminOrSuperAdminOnly, upload.array("images", 20), uploadFiles);

//  Eliminar archivo de Cloudinary
router.delete("/:public_id", protect, adminOrSuperAdminOnly, deleteFile);

export default router;
