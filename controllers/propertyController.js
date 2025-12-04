
import Property from "../models/property.js";

// Normalizar precio/expensas
function normalizeMoneyField(field) {
  if (!field) return undefined;

  // Si viene como número → convertir a objeto
  if (typeof field === "number") {
    return { valor: field, moneda: "ARS" };
  }

  // Si viene como string → convertir número y default moneda
  if (typeof field === "string") {
    return { valor: Number(field), moneda: "ARS" };
  }

  // Si viene en formato { valor, moneda }
  if (typeof field === "object") {
    return {
      valor: Number(field.valor) || 0,
      moneda: field.moneda || "ARS",
    };
  }

  return undefined;
}

// Crear propiedad
export const createProperty = async (req, res) => {
  try {
    const body = req.body;

    console.log("📥 BODY RECIBIDO:", body);

    // ---------------------------
    // 1) Normalizar mainImage
    // ---------------------------
    if (body.mainImage && typeof body.mainImage === "string") {
      body.mainImage = {
        url: body.mainImage,
        public_id: "",
        isCover: true,
      };
    }

    // Ya viene como objeto desde Cloudinary → ok

    // ---------------------------
    // 2) Normalizar multimedia
    // ---------------------------
    if (!Array.isArray(body.multimedia)) {
      body.multimedia = [];
    }

    // ---------------------------
    // 3) Normalizar precio/expensas
    // ---------------------------
    body.precio = normalizeMoneyField(body.precio);
    body.expensas = normalizeMoneyField(body.expensas);

    console.log("📤 BODY NORMALIZADO:", body);

    // ---------------------------
    // 4) Crear propiedad
    // ---------------------------
    const property = new Property(body);
    await property.save();

    res.status(201).json(property);

  } catch (error) {
    console.error("❌ Error al crear propiedad:", error);
    res.status(500).json({
      message: "Error al crear propiedad",
      error,
    });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener propiedades", error });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Propiedad no encontrada" });

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener propiedad", error });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const body = req.body;

    body.price = normalizeMoneyField(body.precio);
    body.expensas = normalizeMoneyField(body.expensas);

    const updated = await Property.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Propiedad no encontrada" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar propiedad", error });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Propiedad no encontrada" });

    res.status(200).json({ message: "Propiedad eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar propiedad", error });
  }
};
