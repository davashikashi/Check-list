// ModalDetalleTarea.js
import React from 'react';
import './ModalDetalleTarea.css';

function ModalDetalleTarea({ tarea, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <div className="field-container">
            <label>Nombre de la Tarea:</label>
            <div>{tarea.nombre}</div>
          </div>
          <div className="field-container">
            <label>Fecha de Inicio:</label>
            <div>{tarea.fechaInicio}</div>
          </div>
          <div className="field-container">
            <label>Fecha de Fin:</label>
            <div>{tarea.fechaFin}</div>
          </div>
          {/* Agrega más campos según sea necesario, como descripción u otros detalles */}
        </div>
      </div>
    </div>
  );
}

export default ModalDetalleTarea;
