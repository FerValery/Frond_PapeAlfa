const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/contacto", (req, res) => {
  const { nombre, correo, mensaje } = req.body || {};

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({
      ok: false,
      mensaje: "Completa nombre, correo y mensaje.",
    });
  }

  return res.json({
    ok: true,
    mensaje: `Gracias, ${nombre}. Recibimos tu mensaje y te contactaremos pronto.`,
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Papelería Alfa lista en http://localhost:${PORT}`);
});
