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
      <button className="btn btn-success me-2" onClick={handleSave}>Save Changes</button>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to List</button>
    </div>
  );
}

export default TodoDetail;
