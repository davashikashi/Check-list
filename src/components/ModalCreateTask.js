import React, { useState } from 'react';
import './ModalCreateTask.css';

function ModalCreateTask({ onClose, onCrearTarea }) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');

  const handleCrearTarea = () => {
    const nuevaTarea = {
      taskName,
      description,
      checkBox: false, // Valor predeterminado establecido en false
      fechaInicio,
      fechaFinal,
    };
    onCrearTarea(nuevaTarea);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Crear Nueva Tarea</h2>
        <div className="form-group">
          <label>Nombre de la Tarea:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Fecha de Inicio:</label>
          <input
            type="datetime-local"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Fecha de Fin:</label>
          <input
            type="datetime-local"
            value={fechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>Cerrar</button>
          <button className="save-button" onClick={handleCrearTarea}>Crear</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCreateTask;
