import React, { useState, useEffect } from 'react';
import './ModalDetalleTarea.css';
import { FaTrash } from 'react-icons/fa';

function ModalDetalleTarea({ tarea, onClose, onActualizarTarea, onEliminarTarea }) {
  const [tareaDetalle, setTareaDetalle] = useState(tarea);

  useEffect(() => {
    setTareaDetalle(tarea);
  }, [tarea]);

  const handleCheckboxChange = () => {
    const tareaActualizada = { ...tareaDetalle, completada: !tareaDetalle.completada };
    setTareaDetalle(tareaActualizada);
    onActualizarTarea(tareaActualizada);
  };

  const handleNombreChange = (e) => {
    const nombre = e.target.value;
    setTareaDetalle({ ...tareaDetalle, nombre });
  };

  const handleDescripcionChange = (e) => {
    const descripcion = e.target.value;
    setTareaDetalle({ ...tareaDetalle, descripcion });
  };

  const handleGuardarCambios = () => {
    onActualizarTarea(tareaDetalle);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>
          <input
            type="text"
            value={tareaDetalle.nombre}
            onChange={handleNombreChange}
            className="nombre-tarea-input"
          />
        </h2>
        <div className="modal-checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={tareaDetalle.completada}
              onChange={handleCheckboxChange}
            />
            Completada
          </label>
          <button className="delete-button" onClick={() => onEliminarTarea(tareaDetalle.id)}>
            <FaTrash />
          </button>
        </div>
        <p>Fecha de inicio: {tareaDetalle.fechaInicio}</p>
        <p>Fecha de fin: {tareaDetalle.fechaFin}</p>
        <div className="descripcion-container">
          <label>Descripción:</label>
          <textarea
            value={tareaDetalle.descripcion || ''}
            onChange={handleDescripcionChange}
            className="descripcion-textarea"
          />
        </div>
        <button onClick={handleGuardarCambios}>Guardar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ModalDetalleTarea;
