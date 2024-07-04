import React, { useState } from 'react';
import Tarea from './Tarea';
import Modal from './Modal';
import ModalMateria from './ModalMateria';
import './ListaMaterias.css';

function ListaMaterias({ materias, onAgregarMateria }) {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoModalAbierto, setNuevoModalAbierto] = useState(false);
  const [accionMateria, setAccionMateria] = useState(null);
  const [materiaParaEditar, setMateriaParaEditar] = useState(null);

  const handleClickMateria = (index) => {
    if (!modalAbierto) {
      setMateriaSeleccionada(index);
    }
  };

  const handleAbrirModalEditar = (index) => {
    setMateriaParaEditar(index);
    setModalAbierto(true);
    setAccionMateria('editar');
  };

  const handleEliminarMateria = (index) => {
    const confirmacion = window.confirm(`¿Estás seguro de eliminar la materia "${materias[index].nombre}"?`);
    if (confirmacion) {
      const nuevasMaterias = [...materias];
      nuevasMaterias.splice(index, 1);
      setMaterias(nuevasMaterias);
    }
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setAccionMateria(null);
    setMateriaParaEditar(null);
  };

  const handleGuardarCambios = (nuevoNombre) => {
    const nuevasMaterias = [...materias];
    nuevasMaterias[materiaParaEditar].nombre = nuevoNombre;
    setMaterias(nuevasMaterias);
    handleCerrarModal();
  };

  const handleAbrirNuevoModal = () => {
    setNuevoModalAbierto(true);
  };

  const handleCerrarNuevoModal = () => {
    setNuevoModalAbierto(false);
  };

  const handleAgregarMateriaDesdeModal = (nombre, imagenURL) => {
    onAgregarMateria(nombre, imagenURL);
  };

  const handleAgregarTarea = () => {
    // Implementa la lógica para agregar una tarea aquí
    console.log('Añadir tarea');
  };

  return (
    <div className="lista-materias">
      <div className="materias">
        <h2>Materias</h2>
        <ul>
          {materias.map((materia, index) => (
            <li
              key={materia.id}
              onClick={() => handleClickMateria(index)}
              className={`materia-item ${materiaSeleccionada === index ? 'selected' : ''}`}
            >
              <img src={materia.imagen}  />
              <div className="materia-nombre">{materia.nombre}</div>
              <button
                className="more-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAbrirModalEditar(index);
                }}
              >
                ...
              </button>
            </li>
          ))}
        </ul>

        <button className="add-button" onClick={handleAbrirNuevoModal}>
          Añadir Materia
        </button>
      </div>

      <div className="tareas">
        <h2>Tareas</h2>
        {materiaSeleccionada !== null && (
          <Tarea materia={materias[materiaSeleccionada]} onClose={() => setMateriaSeleccionada(null)} />
        )}
        
      </div>

      <Modal
        isOpen={modalAbierto}
        onClose={handleCerrarModal}
        materia={materias[materiaParaEditar]}
        onGuardarCambios={handleGuardarCambios}
        onEliminarMateria={() => handleEliminarMateria(materiaParaEditar)}
      />

      <ModalMateria
        isOpen={nuevoModalAbierto}
        onClose={handleCerrarNuevoModal}
        onAgregarMateria={handleAgregarMateriaDesdeModal}
      />
    </div>
  );
}

export default ListaMaterias;
