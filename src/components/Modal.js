// Modal.js

import React, { useState, useEffect } from 'react';
import './Modal.css';
import { FaTrash } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, materia, onGuardarCambios, onEliminarMateria }) => {
    const [nuevoNombre, setNuevoNombre] = useState('');

    useEffect(() => {
        if (materia) {
            setNuevoNombre(materia.nombre);
        }
    }, [materia]);

    const handleChangeNombre = (e) => {
        setNuevoNombre(e.target.value);
    };

    const handleGuardar = () => {
        if (nuevoNombre.trim() !== '') {
            onGuardarCambios(nuevoNombre);
        } else {
            alert('Por favor ingresa un nombre válido.');
        }
    };

    const handleEliminar = () => {
        const confirmacion = window.confirm(`¿Estás seguro de eliminar la materia "${materia.nombre}"?`);
        if (confirmacion) {
            onEliminarMateria();
        }
    };

    return (
        isOpen && (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-body">
                        <div className="image-container">
                            {materia && (
                                <img src={materia.imagen} alt={`Imagen de ${materia.nombre}`} />
                            )}
                        </div>
                        <div className="field-container">
                            <label htmlFor="nombre">Nombre de la materia:</label>
                            <input
                                type="text"
                                id="nombre"
                                value={nuevoNombre}
                                onChange={handleChangeNombre}
                            />
                        </div>
                    </div>
                    <button className="delete-button" onClick={handleEliminar}>
                        <FaTrash /> {//icono de basurero
                        }
                    </button>
                    <div className="modal-buttons">
                        <button className="cancel-button" onClick={onClose}>Cancelar</button>
                        <button className="save-button" onClick={handleGuardar}>Guardar</button>

                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;
