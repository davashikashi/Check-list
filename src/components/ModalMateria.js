// ModalMateria.js
import React, { useState } from 'react';
import './ModalMateria.css'; // Asegúrate de crear un archivo CSS específico para este modal

function ModalMateria({ isOpen, onClose, onAgregarMateria }) {
    const [nombre, setNombre] = useState('');
    const [imagenURL, setImagenURL] = useState('');

    const handleGuardar = () => {
        if (nombre && imagenURL) {
            onAgregarMateria(nombre, imagenURL);
            onClose();
            
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-materia">
            <div className="modal-materia-content">
                <h2>Agregar Nueva Materia</h2>
                <input
                    type="text"
                    placeholder="Nombre de la materia"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={imagenURL}
                    onChange={(e) => setImagenURL(e.target.value)}
                />
                <div className="modal-buttons">
                    <button className="cancel-button" onClick={onClose}>Cancelar</button>
                    <button className="save-button" onClick={handleGuardar}>Guardar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalMateria;
