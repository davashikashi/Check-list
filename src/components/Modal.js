// Modal.js

import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, materia, onGuardarCambios }) => {
  const [nuevoNombre, setNuevoNombre] = useState(materia ? materia.nombre : '');

  const handleChangeNombre = (e) => {
    setNuevoNombre(e.target.value);
  };

  const handleGuardarCambios = () => {
    onGuardarCambios(nuevoNombre);
    onClose();
  };

  if (!isOpen || !materia) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <div>
          <h2>Cambiar Nombre de Materia</h2>
          <input type="text" value={nuevoNombre} onChange={handleChangeNombre} />
          <img src={materia.imagen} alt={materia.nombre} />
        </div>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>Cancelar</button>
          <button className="save-button" onClick={handleGuardarCambios}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
