import React, { useState } from 'react';
import './Tarea.css';
import ModalDetalleTarea from './ModalDetalleTarea';

function Tarea({ materia, onClose }) {
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [tareas, setTareas] = useState(materia.tareas);

  const handleSeleccionarTarea = (tareaId) => {
    setTareaSeleccionada(tareaId);
  };

  const handleCerrarModal = () => {
    setTareaSeleccionada(null);
  };

  const handleCheckboxChange = (tareaId) => {
    setTareas((prevTareas) =>
      prevTareas.map((tarea) =>
        tarea.id === tareaId ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const handleActualizarTarea = (tareaActualizada) => {
    setTareas((prevTareas) =>
      prevTareas.map((tarea) =>
        tarea.id === tareaActualizada.id ? tareaActualizada : tarea
      )
    );
  };

  return (
    <div className="tareas">
      <ul>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            onClick={() => handleSeleccionarTarea(tarea.id)}
            className={`tarea-item ${tarea.completada ? 'completed' : ''}`}
          >
            <label>
              {tarea.nombre}
            </label>
          </li>
        ))}
      </ul>
      <button className="add-tarea-button" onClick={() => {}}>
        Añadir Tarea
      </button>

      {tareaSeleccionada !== null && (
        <ModalDetalleTarea
          tarea={tareas.find((tarea) => tarea.id === tareaSeleccionada)}
          onClose={handleCerrarModal}
          onActualizarTarea={handleActualizarTarea}
        />
      )}
    </div>
  );
}

export default Tarea;
