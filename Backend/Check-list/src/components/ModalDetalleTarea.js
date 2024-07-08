import React, { useState, useEffect } from 'react';
import './ModalDetalleTarea.css';
import { FaTrash } from 'react-icons/fa';

function ModalDetalleTarea({ tarea, onClose, onActualizarTarea, onEliminarTarea }) {
  const [tareaDetalle, setTareaDetalle] = useState(tarea);

  useEffect(() => {
    setTareaDetalle(tarea);
  }, [tarea]);

  const handleCheckboxChange = () => {
    const tareaActualizada = { ...tareaDetalle, checkBox: !tareaDetalle.checkBox };
    setTareaDetalle(tareaActualizada);
  };

  const handleNombreChange = (e) => {
    const taskName = e.target.value;
    setTareaDetalle({ ...tareaDetalle, taskName });
  };

  const handleDescripcionChange = (e) => {
    const description = e.target.value;
    setTareaDetalle({ ...tareaDetalle, description });
  };

  const handleGuardarCambios = () => {
    onActualizarTarea(tareaDetalle, tareaDetalle.projectId);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>
          <input
            type="text"
            value={tareaDetalle.taskName}
            onChange={handleNombreChange}
            className="nombre-tarea-input"
          />
        </h2>
        <div className="modal-checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={tareaDetalle.checkBox}
              onChange={handleCheckboxChange}
            />
            Completada
          </label>
          <button className="delete-button" onClick={() => onEliminarTarea(tareaDetalle.id)}>
            <FaTrash />
          </button>
        </div>
        <p>Fecha de inicio: {tareaDetalle.fechaInicio}</p>
        <p>Fecha de fin: {tareaDetalle.fechaFinal}</p>
        <div className="descripcion-container">
          <label>Descripción:</label>
          <textarea
            value={tareaDetalle.description || ''}
            onChange={handleDescripcionChange}
            className="descripcion-textarea"
          />
        </div>
        <div className='modal-buttons'>
          <button className='cancel-button' onClick={onClose}>Cerrar</button>
          <button className='save-button' onClick={handleGuardarCambios}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDetalleTarea;
