const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión automática a MongoDB usando la red interna de Docker
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mi_mercado';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB con éxito'))
  .catch(err => console.error('❌ Error de conexión a la BD:', err));

// Ruta simple para probar
app.get('/api/despensa', (req, res) => {
  res.json([
    { id: 1, producto: "Leche", vencimiento: "2026-11-15" },
    { id: 2, producto: "Arroz", vencimiento: "2027-05-20" }
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API corriendo en puerto ${PORT}`));
