
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Rutas
import uploadRoutes from "./routes/uploadRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Configuración inicial
dotenv.config();
connectDB();

const app = express();

// --- ZONA DE CÓDIGO A REEMPLAZAR ---

// Definimos los orígenes permitidos de manera robusta
const allowedOriginsSet = new Set([
    process.env.FRONTEND_URL, // Debería ser https://medinaabella.netlify.app
    "http://localhost:5173",
]);

// Configuración de CORS
app.use(
  cors({
    origin: (origin, callback) => {
// 1. Permitir peticiones sin "origin" (Postman/cURL, etc.)
      if (!origin) {
        return callback(null, true);
    }

// 2. Verificar la coincidencia usando Set (más rápido y seguro)
      if (allowedOriginsSet.has(origin)) {
      return callback(null, true);
      }
  
// 3. Bloquear
      console.warn(`🚫 CORS bloqueó una petición desde: ${origin}`);
      return callback(new Error("No autorizado por CORS"));
    },
   credentials: true,
  })
);
