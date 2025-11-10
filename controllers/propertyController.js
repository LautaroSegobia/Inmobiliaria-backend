
import Property from "../models/property.js";

// Obtener todas las propiedades
export const getProperties = async (req, res) => {
  try {
    const propiedades = await Property.find();
    res.json(propiedades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear propiedad (solo admin o developer)
export const createProperty = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      precio,
      moneda,
      expensas,
      monedaExpensas,
      multimedia,
      ...rest
    } = req.body;

    const multimediaArray = Array.isArray(multimedia)
      ? multimedia
      : JSON.parse(multimedia || "[]");

    const cover = multimediaArray.find((img) => img.isCover);

    const payload = {
      titulo,
      descripcion,
      precio: { valor: precio || 0, moneda: moneda || "USD" },
      expensas: { valor: expensas || 0, moneda: monedaExpensas || "ARS" },
      multimedia: multimediaArray,
      mainImage: cover ? cover.url : multimediaArray[0]?.url || null,
      creadoPor: req.user._id,
      ...rest,
    };

    const nueva = await Property.create(payload);
    res.status(201).json(nueva);
  } catch (error) {
    console.error("Error al crear propiedad:", error);
    res.status(500).json({ message: error.message });
  }
};

// Editar propiedad (solo admin o developer)
export const updateProperty = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.body.precio || req.body.moneda) {
      updates.precio = {
        valor: req.body.precio || 0,
        moneda: req.body.moneda || "USD",
      };
    }

    if (req.body.expensas || req.body.monedaExpensas) {
      updates.expensas = {
        valor: req.body.expensas || 0,
        moneda: req.body.monedaExpensas || "ARS",
      };
    }

    delete updates.moneda;
    delete updates.monedaExpensas;

    const propiedad = await Property.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json(propiedad);
  } catch (error) {
    console.error("Error al actualizar propiedad:", error);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar propiedad (solo admin o developer)
export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Propiedad eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
