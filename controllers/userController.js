
export const registerUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Registro exitoso (mock temporal)" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const loginUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Inicio de sesión exitoso (mock temporal)" });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
