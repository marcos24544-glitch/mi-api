const express = require('express');
const cors = require('cors');
const mariadb = require('mariadb');

const app = express();

// 🔥 IMPORTANTE PARA RENDER
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔌 CONEXIÓN A MARIADB (AJUSTA TU PUERTO SI ES 3308)
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'usuarios',
    port: 3306, // ⚠️ cambia a 3308 si usas ese
    connectionLimit: 5
});

// 🚀 RUTA API
app.get('/api/usuarios', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();

        const rows = await conn.query("SELECT * FROM usuarios");

        res.json({
            status: "OK",
            data: rows
        });

    } catch (err) {
        console.error("❌ ERROR:", err);
        res.status(500).json({
            status: "Error",
            mensaje: err.message
        });
    } finally {
        if (conn) conn.release();
    }
});

// 🧠 RUTA BASE (para que no truene en Render)
app.get('/', (req, res) => {
    res.send("API funcionando 🚀");
});

// 🚀 INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});