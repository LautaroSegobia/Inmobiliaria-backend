
import express from "express";
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProperties);
router.post("/", protect, adminOnly, upload.array("imagenes", 10), createProperty);
router.put("/:id", protect, adminOnly, updateProperty);
router.delete("/:id", protect, adminOnly, deleteProperty);

export default router;
