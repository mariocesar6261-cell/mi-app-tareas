const pool = require('./database');
const { agregarTarea, obtenerTareas } = require('./database');

const btnGuardar = document.getElementById('btnGuardar');
const tareaInput = document.getElementById('tareaInput');
const listaTareas = document.getElementById('listaTareas');

// Función para actualizar la lista en pantalla
async function cargarTareas() {
    const tareas = await obtenerTareas();
    listaTareas.innerHTML = ''; // Limpiar lista
    tareas.forEach(tarea => {
        let li = document.createElement('li');
        li.textContent = `${tarea.Id} - ${tarea.Nombre}`;
        listaTareas.appendChild(li);
    });
}

// Acción al hacer clic en el botón
btnGuardar.addEventListener('click', async () => {
    const nombreTarea = tareaInput.value;
    if (nombreTarea.trim() === '') return; // No guardar si está vacío

    await agregarTarea(nombreTarea); // Guardar en SQL Server
    tareaInput.value = ''; // Limpiar el cuadro de texto
    cargarTareas(); // Refrescar la lista
});

// Cargar las tareas apenas abra el programa
cargarTareas();