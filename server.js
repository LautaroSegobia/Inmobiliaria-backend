
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Mdiddlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/propiedades", propertyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
