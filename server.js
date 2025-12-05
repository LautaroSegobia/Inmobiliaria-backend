
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

// Configuración de CORS
const allowedOrigins = [
  process.env.FRONTEND_URL, // URL de producción
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir peticiones sin "origin" (por ejemplo, desde Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
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
  console.error("💥 Error capturado por middleware:", err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥷" : err.stack,
  });
});

// Inicialización del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en el puerto ${PORT}`);
  console.log(`🌐 Modo: ${process.env.NODE_ENV || "development"}`);
  if (process.env.FRONTEND_URL)
    console.log(`🔗 Origen frontend permitido: ${process.env.FRONTEND_URL}`);
});
