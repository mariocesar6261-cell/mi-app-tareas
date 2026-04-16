const sql = require('mssql');

const config = {
    user: 'MarioH',
    password: 'Syst6261',
    server: 'DESKTOP-V8OJI13', // Si usas SQLEXPRESS, pon 'localhost\\SQLEXPRESS'
    database: 'DB_Tareas',
    options: {
        encrypt: false, // Para desarrollo local
        trustServerCertificate: true
    }
};

// Función para guardar una tarea
async function agregarTarea(nombre) {
    try {
        let pool = await sql.connect(config);
        await pool.request().input('nombre', sql.NVarChar, nombre).query('INSERT INTO Tareas (Nombre) VALUES (@nombre)');
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

// Función para obtener todas las tareas
async function obtenerTareas() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM Tareas');
        return result.recordset;
    } catch (err) {
        console.error(err);
        return [];
    }
}

// Exportamos las funciones para usarlas en la interfaz
module.exports = { agregarTarea, obtenerTareas };