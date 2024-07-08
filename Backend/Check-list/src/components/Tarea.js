import React, { useEffect, useState } from 'react';
import './Tarea.css';
import ModalDetalleTarea from './ModalDetalleTarea';
import ModalCreateTask from './ModalCreateTask';
import axios from 'axios';

function Tarea({ materia }) {
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [tareas, setTareas] = useState([]);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);

  const fetchTareas = async () => {
    try {
      const response = await fetch(`http://localhost:30081/tasks/project/${materia.id}`);
      if (!response.ok) {
        throw new Error('No se pudo obtener las materias');
      } else {
        const data = await response.json();
        console.log('Tareas obtenidas:', data);
        setTareas(data);
      }
    } catch (error) {
      console.error('Error al obtener las materias:', error);
    }
  };

  const createTarea = async (nuevaTarea) => {
    try {
      const response = await axios.post('http://localhost:30081/tasks', {
        ...nuevaTarea,
        projectId: materia.id,
      });
      console.log('Tarea agregada:', response.data);
      setTareas([...tareas, response.data]);
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  const updateTarea = async (tareaActualizada) => {
    try {
      const tareaUpdated = {
        taskName: tareaActualizada.taskName,
        description: tareaActualizada.description,
        checkBox: tareaActualizada.checkBox,
        fechaInicio: tareaActualizada.fechaInicio,
        fechaFinal: tareaActualizada.fechaFinal,
        projectId: materia.id,
      };
      await axios.patch(`http://localhost:30081/tasks/${tareaActualizada.id}`, tareaUpdated);
      fetchTareas();
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const eliminarTarea = async (taskId) => {
    try {
      const confirmacion = window.confirm(`¿Estás seguro de eliminar la tarea?`);
      if (confirmacion) {
        await axios.delete(`http://localhost:30081/tasks/${taskId}`);
        const nuevasTareas = tareas.filter((tarea) => tarea.id !== taskId);
        setTareas(nuevasTareas);
      }
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, [materia]);

  const handleSeleccionarTarea = (tareaId) => {
    setTareaSeleccionada(tareaId);
  };

  const handleCerrarModal = () => {
    setTareaSeleccionada(null);
  };

  const handleCheckboxChange = (tareaId) => {
    const nuevasTareas = tareas.map((tarea) =>
      tarea.id === tareaId ? { ...tarea, checkBox: !tarea.checkBox } : tarea
    );
    setTareas(nuevasTareas);
  };

  const handleActualizarTarea = (tareaActualizada) => {
    updateTarea(tareaActualizada);
  };

  const handleEliminarTarea = (tareaId) => {
    eliminarTarea(tareaId);
    setTareaSeleccionada(null);
  };

  const handleCrearTarea = (nuevaTarea) => {
    createTarea(nuevaTarea);
    setMostrarModalCrear(false);
  };

  return (
    <div className="tareas">
      <ul>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            onClick={() => handleSeleccionarTarea(tarea.id)}
            className={`tarea-item ${tarea.checkBox ? 'completed' : ''}`}
          >
            <label>{tarea.taskName}</label>
            <input
              type="checkbox"
              checked={tarea.checkBox}
              onChange={() => handleCheckboxChange(tarea.id)}
            />
          </li>
        ))}
      </ul>
      <button className="add-tarea-button" onClick={() => setMostrarModalCrear(true)}>
        Añadir Tarea
      </button>

      {tareaSeleccionada !== null && (
        <ModalDetalleTarea
          tarea={tareas.find((tarea) => tarea.id === tareaSeleccionada)}
          onClose={handleCerrarModal}
          onActualizarTarea={handleActualizarTarea}
          onEliminarTarea={() => handleEliminarTarea(tareaSeleccionada)}
        />
      )}

      {mostrarModalCrear && (
        <ModalCreateTask
          onClose={() => setMostrarModalCrear(false)}
          onCrearTarea={handleCrearTarea}
        />
      )}
    </div>
  );
}

export default Tarea;
