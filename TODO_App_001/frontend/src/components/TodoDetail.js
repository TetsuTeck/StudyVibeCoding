import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/todos/${id}/`);
      setTodo(response.data);
      setTitle(response.data.title);
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/todos/${id}/`, {
        title: title,
        completed: todo.completed,
      });
      setTodo(response.data);
      alert('Todo updated successfully!');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleCompleted = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/todos/${id}/`, {
        title: todo.title,
        completed: !todo.completed,
      });
      setTodo(response.data);
    } catch (error) {
      console.error('Error toggling completed status:', error);
    }
  };

  if (!todo) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Todo Detail</h2>
      <div className="mb-3">
        <label htmlFor="todoTitle" className="form-label">Title:</label>
        <input
          type="text"
          className="form-control"
          id="todoTitle"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="todoCompleted"
          checked={todo.completed}
          onChange={handleToggleCompleted}
        />
        <label className="form-check-label" htmlFor="todoCompleted">Completed</label>
      </div>
      <button className="btn btn-success me-2" onClick={handleSave}>Save Changes</button>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to List</button>
    </div>
  );
}

export default TodoDetail;