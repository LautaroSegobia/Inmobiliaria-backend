
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String },

    precio: {
      valor: { type: Number, required: true },
      moneda: { type: String, enum: ["USD", "ARS"], required: true },
    },
    expensas: {
      valor: { type: Number },
      moneda: { type: String, enum: ["USD", "ARS"] },
    },

    metrosCubiertos: { type: Number },
    metrosDescubiertos: { type: Number },
    metrosTotales: { type: Number },
    ambientes: { type: Number },
    dormitorios: { type: Number },
    banos: { type: Number },
    piso: { type: String },
    antiguedad: { type: String },
    operacion: { type: String },
    tipo: { type: String },
    orientacion: { type: String },
    luminacion: { type: String },
    cochera: { type: Boolean, default: false },
    balcon: { type: Boolean, default: false },

    calle: { type: String },
    numero: { type: String },
    zona: { type: String },

    multimedia: [
      {
        url: { type: String, required: true },
        tipo: { type: String, enum: ["imagen", "video"], default: "imagen" },
        public_id: { type: String },
        isCover: { type: Boolean, default: false },
      },
    ],

    mainImage: { type: String }, // URL de la imagen de portada

    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
