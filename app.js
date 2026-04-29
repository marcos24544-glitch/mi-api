const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Datos simulados (igual que los de tu base)
const usuarios = [
    { id: 1, nombre: "Marcos López Lira" },
    { id: 2, nombre: "Jose Geovanni Perales Godinez" },
    { id: 3, nombre: "Jose Miguel Jimenez Gonzales" },
    { id: 4, nombre: "Samuel Martinez Venegas" },
    { id: 5, nombre: "Luis Moncada Gonzales" }
];

// Ruta principal
app.get('/', (req, res) => {
    res.send(`
        <h1>API de Usuarios - Funcionando 🚀</h1>
        <p>Ve a: <a href="/api/usuarios">/api/usuarios</a></p>
    `);
});

// Ruta de la API
app.get('/api/usuarios', (req, res) => {
    res.json({
        status: "OK",
        total: usuarios.length,
        data: usuarios
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});