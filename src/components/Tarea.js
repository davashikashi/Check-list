import React, { useState } from 'react';
import './Tarea.css';
import ModalDetalleTarea from './ModalDetalleTarea';

function Tarea({ materia, onClose }) {
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  const handleSeleccionarTarea = (tareaId) => {
    setTareaSeleccionada(tareaId);
  };

  const handleCerrarModal = () => {
    setTareaSeleccionada(null);
  };

  return (
    <div className="tareas-materia">
      <ul>
        {materia.tareas.map((tarea) => (
          <li key={tarea.id} onClick={() => handleSeleccionarTarea(tarea.id)} className="tarea-item">
            <label>
              <input type="checkbox" checked={tarea.completada} onChange={() => {}} />
              {tarea.nombre} - {tarea.fechaInicio} hasta {tarea.fechaFin}
            </label>
          </li>
        ))}
      </ul>
      <button className="add-task-button-container" onClick={() => {}}>
        Añadir Tarea
      </button>

      {tareaSeleccionada !== null && (
        <ModalDetalleTarea
          tarea={materia.tareas.find((tarea) => tarea.id === tareaSeleccionada)}
          onClose={handleCerrarModal}
        />
      )}
    </div>
  );
}

export default Tarea;
