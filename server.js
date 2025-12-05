
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Rutas
import uploadRoutes from "./routes/uploadRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS CONFIG (Versión estable para producción)
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requests sin origin (Render, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("❌ CORS bloqueado desde:", origin);
      return callback(null, false); // NO lanzar error
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight siempre aceptado
app.options("*", cors());

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/upload", uploadRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/users", authRoutes);

app.get("/", (req, res) => {
  res.status(200).send("✅ API Inmobiliaria funcionando correctamente");
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("💥 Error:", err.message || err);

  res.status(res.statusCode !== 200 ? res.statusCode : 500).json({
    success: false,
    message: err.message || "Error interno",
    stack: process.env.NODE_ENV === "production" ? "🥷" : err.stack,
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend escuchando en puerto ${PORT}`);
  console.log(`🌐 FRONTEND_URL permitido: ${process.env.FRONTEND_URL}`);
});
