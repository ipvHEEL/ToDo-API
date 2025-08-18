import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from "@tsparticles/react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const API_URL = 'http://localhost:8080/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = { title, done: false };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const savedTask = await res.json();
      setTasks(prev => [savedTask, ...prev]); 
      setTitle('');
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  const toggleDone = async (task) => {
    try {
      const updated = { ...task, done: !task.done };
      await fetch(`${API_URL}/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      setTasks(tasks.map(t => t.id === task.id ? updated : t));
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  
  const particlesInit = useCallback((engine) => {
    console.log("Particles initialized");
  }, []);

  const particlesOptions = {
    background: { color: "#0f0f1e" },
    fpsLimit: 60,
    particles: {
      color: { value: "#00ffcc" },
      links: { color: "#00ffcc", distance: 150, enable: true, opacity: 0.2 },
      move: { direction: "none", enable: true, speed: 1, outModes: "bounce" },
      size: { value: 2 },
      opacity: { value: 0.5 },
    },
    detectRetina: true,
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', fontFamily: 'Orbitron, sans-serif' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />

      
      <div className="container mt-5" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-dark text-light p-5 rounded-4 shadow-lg"
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 204, 0.3)',
          }}
        >
          <h1 className="text-center mb-4" style={{ color: '#00ffcc', textShadow: '0 0 10px #00ffcc' }}>
            TO-DO LISTS 
          </h1>

          <motion.form
            onSubmit={addTask}
            className="mb-4 d-flex"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Новая задача... "
              className="form-control me-2 bg-dark text-light border-secondary"
              style={{ boxShadow: '0 0 8px rgba(0, 255, 204, 0.3)' }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn btn-outline-info"
              style={{ fontWeight: 'bold' }}
            >
              ✚ Добавить
            </motion.button>
          </motion.form>

          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, rotate: 10, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="list-group-item d-flex justify-content-between align-items-center bg-transparent border border-secondary mb-2"
                style={{
                  cursor: 'pointer',
                  color: task.done ? '#555' : '#fff',
                  textDecoration: task.done ? 'line-through' : 'none',
                  textShadow: task.done ? 'none' : '0 0 5px rgba(0, 255, 204, 0.5)',
                  userSelect: 'none',
                }}
                onClick={() => toggleDone(task)}
                whileHover={{ backgroundColor: 'rgba(0, 255, 204, 0.1)', border: '1px solid #00ffcc' }}
              >
                <span>{task.title}</span>
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                  className="btn btn-sm btn-outline-danger"
                  style={{ fontWeight: 'bold' }}
                >
                  -
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>

          <div className="text-center text-muted mt-4" style={{ fontSize: '0.9em' }}>
            {tasks.length} задач{tasks.length !== 1 ? 'и' : ''}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;