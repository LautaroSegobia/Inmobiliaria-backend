
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"], // roles válidos
      default: "user",
    },
  },
  { timestamps: true }
);

// 🔒 Encriptar password antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Comparar contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ⚠️ IMPORTANTE: ESM requiere extensión `.js`
const User = mongoose.model("User", userSchema);
export default User;
