
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// 🔒 Middleware para proteger rutas (requiere token válido)
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("Usuario no encontrado");
      }

      next();
    } catch (error) {
      console.error("Token inválido:", error);
      res.status(401);
      throw new Error("Token no válido o expirado");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No autorizado, token ausente");
  }
});

// 👑 Middleware para permitir solo admin o superAdmin
export const adminOrSuperAdminOnly = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "superAdmin")) {
    next();
  } else {
    res.status(403);
    throw new Error("Acceso denegado: solo administradores");
  }
};

// 🔒 Opcional: Solo admin (si querés rutas exclusivas de admin)
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Acceso denegado: solo administradores");
  }
};
