// Tarea.js
import React from 'react';
import './Tarea.css'; // Importa el archivo de estilos CSS local

function Tarea({ materia, onClose }) {
  return (
    <div className="tareas-materia">
      <div className="back-button" onClick={onClose}>
        <span>&lt; Volver</span>
      </div>
      <h2>{materia.nombre}</h2>
      <ul>
        {materia.tareas.map((tarea) => (
          <li key={tarea.id}>
            <label>
              <input type="checkbox" checked={tarea.completada} onChange={() => {}} />
              {tarea.nombre} - {tarea.fechaInicio} hasta {tarea.fechaFin}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        const nombre = prompt('Ingrese el nombre de la tarea:');
        const fechaInicio = prompt('Ingrese la fecha de inicio (YYYY-MM-DD):');
        const fechaFin = prompt('Ingrese la fecha de fin (YYYY-MM-DD):');
        // Asume que obtienes la materiaId desde el estado o props
        const materiaId = materia.id; // Asumiendo que tienes la materiaId desde algún lugar
        // Añadir la tarea a la lista de tareas de la materia
        materia.tareas.push({ id: materia.tareas.length + 1, nombre, fechaInicio, fechaFin, completada: false });
      }}>
        Añadir Tarea
      </button>
    </div>
  );
}

export default Tarea;
