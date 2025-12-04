
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    isCover: { type: Boolean, default: false },
  },
  { _id: false }
);

const moneySchema = new mongoose.Schema(
  {
    valor: { type: Number, required: true },
    moneda: { type: String, enum: ["USD", "ARS"], required: true },
  },
  { _id: false }
);

const propertySchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },

    precio: { type: moneySchema, required: false },
    expensas: { type: moneySchema, required: false },

    ambientes: { type: Number },
    dormitorios: { type: Number },
    banos: { type: Number },
    piso: { type: Number },
    antiguedad: { type: Number },
    operacion: { type: String },
    tipo: { type: String },
    orientacion: { type: String },

    cochera: { type: Boolean, default: false },
    balcon: { type: Boolean, default: false },

    calle: { type: String },
    numero: { type: String },
    zona: { type: String },

    multimedia: { type: [imageSchema], default: [] },

    mainImage: { type: imageSchema, default: null },

    creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
