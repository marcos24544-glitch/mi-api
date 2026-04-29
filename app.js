const express = require('express');
const cors = require('cors');
const mariadb = require('mariadb');

const app = express();
app.use(cors());

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'usuarios',
    port: 3308,
    connectionLimit: 5
});

// 🔥 RUTA BONITA
app.get('/api/usuarios', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const datos = await conn.query("SELECT * FROM usuarios");

        let html = `
        <html>
        <head>
            <title>Usuarios</title>
            <style>
                body {
                    font-family: Arial;
                    background: #0f172a;
                    color: white;
                    text-align: center;
                }
                table {
                    margin: auto;
                    border-collapse: collapse;
                    width: 50%;
                    background: #1e293b;
                    border-radius: 10px;
                    overflow: hidden;
                }
                th, td {
                    padding: 12px;
                    border-bottom: 1px solid #334155;
                }
                th {
                    background: #38bdf8;
                    color: black;
                }
                tr:hover {
                    background: #334155;
                }
                h1 {
                    margin-top: 30px;
                }
            </style>
        </head>
        <body>
            <h1>Lista de Usuarios 🚀</h1>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                </tr>
        `;

        datos.forEach(u => {
            html += `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.nombre}</td>
                </tr>
            `;
        });

        html += `
            </table>
        </body>
        </html>
        `;

        res.send(html);

    } catch (err) {
        res.send(err);
    } finally {
        if (conn) conn.release();
    }
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});