const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Datos de tus usuarios
const usuarios = [
    { id: 1, nombre: "Marcos López Lira" },
    { id: 2, nombre: "Jose Geovanni Perales Godinez" },
    { id: 3, nombre: "Jose Miguel Jimenez Gonzales" },
    { id: 4, nombre: "Samuel Martinez Venegas" },
    { id: 5, nombre: "Luis Moncada Gonzales" }
];

// Ruta principal (bonita)
app.get('/', (req, res) => {
    res.send(`
        <h1>✅ API de Usuarios - Desplegada en Render</h1>
        <p>Ve la lista de usuarios aquí: <a href="/api/usuarios">/api/usuarios</a></p>
    `);
});

// Ruta con tabla bonita
app.get('/api/usuarios', (req, res) => {
    let html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de Usuarios</title>
        <style>
            body {
                font-family: 'Segoe UI', Arial, sans-serif;
                background: linear-gradient(135deg, #0f172a, #1e2937);
                color: #e2e8f0;
                margin: 0;
                padding: 20px;
                min-height: 100vh;
            }
            h1 {
                text-align: center;
                color: #38bdf8;
                margin-bottom: 30px;
            }
            .container {
                max-width: 900px;
                margin: 0 auto;
                background: #1e2937;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                padding: 14px 20px;
                text-align: left;
            }
            th {
                background: #38bdf8;
                color: #0f172a;
                font-weight: bold;
            }
            tr:nth-child(even) {
                background: #334155;
            }
            tr:hover {
                background: #475569;
                transition: 0.3s;
            }
            td {
                border-bottom: 1px solid #475569;
            }
            .id-col {
                width: 80px;
                text-align: center;
                font-weight: bold;
            }
            .status {
                text-align: center;
                padding: 10px;
                background: #22c55e;
                color: black;
                font-weight: bold;
                border-radius: 6px;
                display: inline-block;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Lista de Usuarios</h1>
            <div style="text-align: center; margin-bottom: 15px;">
                <span class="status">✅ ${usuarios.length} usuarios registrados</span>
            </div>
            
            <table>
                <tr>
                    <th class="id-col">ID</th>
                    <th>Nombre Completo</th>
                </tr>`;

    usuarios.forEach(usuario => {
        html += `
                <tr>
                    <td class="id-col">${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                </tr>`;
    });

    html += `
            </table>
        </div>
    </body>
    </html>`;

    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});