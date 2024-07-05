// App.js
import React, { useState } from 'react';
import ListaMaterias from './ListaMaterias';

function App() {
  const [materias, setMaterias] = useState([
    {
      id: 1,
      nombre: 'Matemáticas',
      imagen: "https://imgs.search.brave.com/OjFWHfsQNiI5rFutQLEguY2kZacU387mKWTP4JK_UnA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuZG9jc2l0eS5j/b20vc2RrL2hlYWRl/ci9vdHRpZW5pLXB1/bnRpLnN2Zw",
      tareas: [
        { id: 1, nombre: 'Resolver problemas', fechaInicio: '2024-07-01', fechaFin: '2024-07-05', completada: false, descripcion: 'Resolver los problemas del capítulo 3' },
        { id: 2, nombre: 'Estudiar para el examen', fechaInicio: '2024-07-05', fechaFin: '2024-07-10', completada: true, descripcion: 'Repasar todos los temas vistos hasta ahora' }
      ]
    },
    {
      id: 2,
      nombre: 'Historia',
      imagen: "https://imgs.search.brave.com/OjFWHfsQNiI5rFutQLEguY2kZacU387mKWTP4JK_UnA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuZG9jc2l0eS5j/b20vc2RrL2hlYWRl/ci9vdHRpZW5pLXB1/bnRpLnN2Zw",
      tareas: [
        { id: 1, nombre: 'Leer capítulo 5', fechaInicio: '2024-07-03', fechaFin: '2024-07-07', completada: false, descripcion: 'Leer y resumir el capítulo 5 del libro de texto' },
        { id: 2, nombre: 'Preparar presentación', fechaInicio: '2024-07-08', fechaFin: '2024-07-12', completada: false, descripcion: 'Preparar una presentación sobre la Revolución Industrial' }
      ]
    }
  ]);

  const handleAgregarMateria = (nombre) => {
    const nuevaMateria = {
      id: materias.length + 1,
      nombre,
      tareas: []
    };
    setMaterias([...materias, nuevaMateria]);
  };

  return (
    <div className="App">
      <ListaMaterias materias={materias} onAgregarMateria={handleAgregarMateria} />
    </div>
  );
}

export default App;
