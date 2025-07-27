import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [subject, setSubject] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [newChecklistItemText, setNewChecklistItemText] = useState('');

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/todos/${id}/`);
      setTodo(response.data);
      setSubject(response.data.subject);
      setStartDate(response.data.start_date || '');
      setEndDate(response.data.end_date || '');
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/todos/${id}/`, {
        subject: subject,
        start_date: startDate || null,
        end_date: endDate || null,
        status: status,
      });
      setTodo(response.data);
      alert('Todo updated successfully!');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const addChecklistItem = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/todos/${id}/checklist-items/`, {
        text: newChecklistItemText,
        completed: false,
      });
      setTodo({ ...todo, checklist_items: [...todo.checklist_items, response.data] });
      setNewChecklistItemText('');
    } catch (error) {
      console.error('Error adding checklist item:', error);
    }
  };

  const toggleChecklistItemCompleted = async (itemId, completed) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/todos/${id}/checklist-items/${itemId}/`, {
        completed: !completed,
      });
      setTodo({
        ...todo,
        checklist_items: todo.checklist_items.map((item) =>
          item.id === itemId ? response.data : item
        ),
      });
    } catch (error) {
      console.error('Error toggling checklist item completed status:', error);
    }
  };

  const deleteChecklistItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}/checklist-items/${itemId}/`);
      setTodo({
        ...todo,
        checklist_items: todo.checklist_items.filter((item) => item.id !== itemId),
      });
    } catch (error) {
      console.error('Error deleting checklist item:', error);
    }
  };

  if (!todo) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Todo Detail</h2>
      <div className="mb-3">
        <label htmlFor="subject" className="form-label">Subject:</label>
        <input
          type="text"
          className="form-control"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="startDate" className="form-label">Start Date:</label>
        <input
          type="date"
          className="form-control"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="endDate" className="form-label">End Date:</label>
        <input
          type="date"
          className="form-control"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status:</label>
        <select
          className="form-select"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button className="btn btn-success me-2 mb-4" onClick={handleSave}>Save Changes</button>

      <h3 className="mt-5">Checklist Items</h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newChecklistItemText}
          onChange={(e) => setNewChecklistItemText(e.target.value)}
          placeholder="Add new checklist item"
        />
        <button className="btn btn-outline-secondary" type="button" onClick={addChecklistItem}>Add Item</button>
      </div>
      <ul className="list-group">
        {todo.checklist_items.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={item.completed}
                onChange={() => toggleChecklistItemCompleted(item.id, item.completed)}
              />
              <span className={item.completed ? 'text-decoration-line-through text-muted' : ''}>
                {item.text}
              </span>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => deleteChecklistItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-4" onClick={() => navigate('/')}>Back to List</button>
    </div>
  );
}

export default TodoDetail;
