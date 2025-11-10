
import cloudinary from "../config/cloudinary.js";

export const uploadFiles = async (req, res) => {
  try {
    if (!req.files || !req.files.length) {
      return res.status(400).json({ message: "No se recibieron archivos" });
    }

    const archivos = req.files.map((file) => ({
      url: file.path || file.secure_url || "",
      tipo: file.mimetype && file.mimetype.startsWith("video/") ? "video" : "imagen",
      public_id: file.filename || file.public_id || "",
    }));

    res.status(200).json(archivos);
  } catch (error) {
    console.error("❌ Error al subir archivos:", error);
    res.status(500).json({ message: "Error al subir archivos", error: error.message || error });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { public_id } = req.params;
    if (!public_id) return res.status(400).json({ message: "public_id requerido" });

    await cloudinary.uploader.destroy(public_id, { resource_type: "auto" });

    res.status(200).json({ message: "Archivo eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar archivo:", error);
    res.status(500).json({ message: "Error al eliminar archivo", error: error.message || error });
  }
};
