
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descripcionCorta: String,
    descripcionLarga: String,
    precio: Number,
    expensas: Number,
    moneda: { type: String, default: "ARS" },
    calle: String,
    numero: String,
    zona: String,
    tipo: String,
    imagen: String,
    imagenes: [String],
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
