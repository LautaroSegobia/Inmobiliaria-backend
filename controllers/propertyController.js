
import Property from "../models/Property.js";

// Obtener todas las propiedades
export const getProperties = async (req, res) => {
  try {
    const propiedades = await Property.find();
    res.json(propiedades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear propiedad (solo admin)
export const createProperty = async (req, res) => {
  try {
    const imageUrls = req.files?.map((file) => file.path) || [];

    const nueva = await Property.create({
      ...req.body,
      imagenes: imageUrls,
      creadoPor: req.user._id,
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Editar propiedad (solo admin)
export const updateProperty = async (req, res) => {
  try {
    const propiedad = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(propiedad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar propiedad (solo admin)
export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Propiedad eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
