import React, { useState, useEffect } from 'react';
import Tarea from './Tarea';
import Modal from './Modal';
import ModalMateria from './ModalMateria';
import './ListaMaterias.css';

function ListaMaterias({ listaMaterias, onAgregarMateria, onEliminarMateria, onEditarMateria }) {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoModalAbierto, setNuevoModalAbierto] = useState(false);
  const [materiaParaEditar, setMateriaParaEditar] = useState(null);
  const [materias, setMaterias] = useState(listaMaterias);

  useEffect(() => {
    setMaterias(listaMaterias); // Sincroniza el estado de materias con listaMaterias cuando listaMaterias cambie
  }, [listaMaterias]);

  const handleClickMateria = (index) => {
    setMateriaSeleccionada(index);
  };

  const handleAbrirModalEditar = (index) => {
    setMateriaParaEditar(index);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setMateriaParaEditar(null);
  };

  const handleGuardarCambios = (materiaID,nuevoNombre) => {
    onEditarMateria(materiaID,nuevoNombre)
    setMaterias(materias)
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
    setNuevoModalAbierto(false);
  };

  const handleDeleteMateria = (materiaID) => {
    onEliminarMateria(materiaID);
    setModalAbierto(false);
  };

  const handleActualizarTareas = (materiaId, nuevasTareas) => {
    const nuevasMaterias = materias.map((materia) =>
      materia.id === materiaId ? { ...materia, tareas: nuevasTareas } : materia
    );
    setMaterias(nuevasMaterias);
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
              <img src={materia.img} alt="" />
              <div className="materia-nombre">{materia.asignatureName}</div>
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

        <button className="add-materia-button" onClick={handleAbrirNuevoModal}>
          Añadir Materia
        </button>
      </div>

      <div className="tareas">
        <h2>Tareas</h2>
        {materiaSeleccionada !== null && materias[materiaSeleccionada] && (
          <Tarea
            key={materiaSeleccionada} // Asegura que se vuelve a renderizar al cambiar la selección
            materia={materias[materiaSeleccionada]}
            onClose={() => setMateriaSeleccionada(null)}
            onActualizarTareas={handleActualizarTareas} // Pasar el callback para actualizar tareas
          />
        )}
      </div>

      <Modal
        isOpen={modalAbierto}
        onClose={handleCerrarModal}
        materia={materias[materiaParaEditar]}
        onGuardarCambios={handleGuardarCambios}
        onEliminarMateria={handleDeleteMateria}
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
