
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import uploadRoutes from "./routes/uploadRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// 📁 Rutas principales
app.use("/api/upload", uploadRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/users", authRoutes); // 👈 CORRECTO

app.get("/", (req, res) => res.send("✅ API Inmobiliaria en funcionamiento"));

app.use((err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
