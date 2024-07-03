// ListaMaterias.js

import React, { useState } from 'react';
import Tarea from './Tarea';
import Modal from './Modal'; // Importa el componente Modal
import './ListaMaterias.css'; // Importa el archivo de estilos CSS local

function ListaMaterias({ materias, onAgregarMateria }) {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [accionMateria, setAccionMateria] = useState(null);

  const handleAbrirModal = (accion) => {
    setModalAbierto(true);
    setAccionMateria(accion);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setAccionMateria(null);
  };

  const handleGuardarCambios = (nuevoNombre) => {
    const nuevasMaterias = [...materias];
    nuevasMaterias[materiaSeleccionada].nombre = nuevoNombre;
    // Aquí podrías llamar a una función para guardar los cambios en el backend si fuera necesario
    // onGuardarCambiosBackend(nuevasMaterias[materiaSeleccionada].id, { nombre: nuevoNombre });
    setMaterias(nuevasMaterias);
  };

  const handleAgregarMateria = () => {
    const nombre = prompt('Ingrese el nombre de la materia:');
    const imagenURL = prompt('Ingrese la URL de la imagen relacionada:');
    if (nombre && imagenURL) {
      onAgregarMateria(nombre, imagenURL);
    }
  };

  return (
    <div className="lista-materias">
      <ul>
        {materias.map((materia, index) => (
          <li key={materia.id} onClick={() => setMateriaSeleccionada(index)}>
            <div className="materia-item">
              <button className="more-button" onClick={(e) => { e.stopPropagation(); handleAbrirModal('cambiarNombre'); }}>
                ...
              </button>
              <img src={materia.imagen} alt={materia.nombre}/>
              <div className="materia-nombre">{materia.nombre}</div>
            </div>
          </li>
        ))}
      </ul>

      {materiaSeleccionada !== null && (
        <Tarea materia={materias[materiaSeleccionada]} onClose={() => setMateriaSeleccionada(null)} />
      )}

      <button className="add-button" onClick={handleAgregarMateria}>
        +
      </button>

      <Modal
        isOpen={modalAbierto}
        onClose={handleCerrarModal}
        materia={materias[materiaSeleccionada]}
        onGuardarCambios={handleGuardarCambios}
      />
    </div>
  );
}

export default ListaMaterias;
