
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

const app = express();

const allowedOriginsSet = new Set([
    process.env.FRONTEND_URL,
    "http://localhost:5173",
]);

// Configuración de CORS
app.use(
  cors({
    origin: (origin, callback) => {
// Permitir peticiones sin "origin" (Postman/cURL, etc.)
      if (!origin) {
        return callback(null, true);
      }

// Verificar la coincidencia usando Set (más rápido y seguro)
      if (allowedOriginsSet.has(origin)) {
        return callback(null, true);
      }

// Bloquear
      console.warn(`🚫 CORS bloqueó una petición desde: ${origin}`);
      return callback(new Error("No autorizado por CORS"));
    },
    credentials: true,
  })
);

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use("/api/upload", uploadRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/users", authRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.status(200).send("✅ API Inmobiliaria funcionando correctamente");
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error("Error obtenido por middleware:", err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
   stack: process.env.NODE_ENV === "production" ? "🥷" : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB(); 

        app.listen(PORT, () => {
            console.log(`🚀 Servidor backend escuchando en el puerto ${PORT}`);
            console.log(`🌐 Modo: ${process.env.NODE_ENV || "development"}`);
            if (process.env.FRONTEND_URL)
                console.log(`🔗 Origen frontend permitido: ${process.env.FRONTEND_URL}`);
        });
    } catch (error) {
        console.error("💥 Error fatal al iniciar el servidor:", error.message);
        process.exit(1);
    }
};

startServer();