import React, { useState, useEffect } from 'react';
import './ModalDetalleTarea.css';

function ModalDetalleTarea({ tarea, onClose, onActualizarTarea }) {
  const [tareaDetalle, setTareaDetalle] = useState(tarea);

  useEffect(() => {
    setTareaDetalle(tarea);
  }, [tarea]);

  const handleCheckboxChange = () => {
    const tareaActualizada = { ...tareaDetalle, completada: !tareaDetalle.completada };
    setTareaDetalle(tareaActualizada);
    onActualizarTarea(tareaActualizada);
  };

  const handleDescripcionChange = (e) => {
    const tareaActualizada = { ...tareaDetalle, descripcion: e.target.value };
    setTareaDetalle(tareaActualizada);
  };

  const handleGuardarCambios = () => {
    onActualizarTarea(tareaDetalle);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{tareaDetalle.nombre}</h2>
        <div className="modal-checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={tareaDetalle.completada}
              onChange={handleCheckboxChange}
            />
            Completada
          </label>
        </div>
        <p>Fecha de inicio: {tareaDetalle.fechaInicio}</p>
        <p>Fecha de fin: {tareaDetalle.fechaFin}</p>
        <div className="descripcion-container">
          <label>Descripción:</label>
          <textarea
            value={tareaDetalle.descripcion || ''}
            onChange={handleDescripcionChange}
          />
        </div>
        <button onClick={handleGuardarCambios}>Guardar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ModalDetalleTarea;
