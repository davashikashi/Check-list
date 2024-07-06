import React, { useEffect, useState } from 'react';
import ListaMaterias from './ListaMaterias';
import axios from 'axios';

function App() {

  const [materias, setMaterias] = useState([])

  useEffect(() => {
    fetchMaterias(); // Llama a la función para obtener materias cuando el componente se monte
  }, []);

  const fetchMaterias = async () => {
    try {
      const response = await fetch('https://3jt241sk-3000.use.devtunnels.ms/projects');
      if (!response.ok) {
        throw new Error('No se pudo obtener las materias');
      } else {
        const data = await response.json();
        console.log('Materias obtenidas:', data);
        setMaterias(data);
      }
    } catch (error) {
      console.error('Error al obtener las materias:', error);
      // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    }
  };


  const handleAgregarMateria = async (nombre, imagenURL) => {
    try {
      const nuevaMateria = {
        asignatureName: nombre,
        img: imagenURL,
        tasks: []
      };

      // Realizar la solicitud POST para agregar la nueva materia
      const response = await axios.post('https://3jt241sk-3000.use.devtunnels.ms/projects', nuevaMateria);
      console.log('Materia agregada:', response.data);

      // Actualizar el estado local de materias con la nueva materia añadida
      setMaterias([...materias, response.data]);
    } catch (error) {
      console.error('Error al agregar la materia:', error);
      // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    }
  };


  const handleEliminarMateria = async (materiaId) => {
    try {
      const confirmacion = window.confirm(`¿Estás seguro de eliminar la materia?`);
      if (confirmacion) {
        await axios.delete(`https://3jt241sk-3000.use.devtunnels.ms/projects/${materiaId}`);
        const nuevasMaterias = materias.filter(materia => materia.id !== materiaId);
        setMaterias(nuevasMaterias);
      }
    } catch (error) {
      console.error('Error al eliminar la materia:', error);
      // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  const handleEditarMateria = async (materiaId, nuevoNombre) => {
    try {
      const materiaActualizada = {
        asignatureName: nuevoNombre
      };
      await axios.patch(`https://3jt241sk-3000.use.devtunnels.ms/projects/${materiaId}`, materiaActualizada);
      fetchMaterias(); // Actualiza la lista de materias después de editar
    } catch (error) {
      console.error('Error al editar la materia:', error);
    }
  };
  

  return (
    <div className="App">
      <ListaMaterias
        listaMaterias={materias}
        onAgregarMateria={handleAgregarMateria}
        onEliminarMateria={handleEliminarMateria}
        onEditarMateria={handleEditarMateria}
      />
    </div>
  );
}

export default App;
