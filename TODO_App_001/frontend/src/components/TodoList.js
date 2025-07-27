import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodoSubject, setNewTodoSubject] = useState('');
  const [newTodoStartDate, setNewTodoStartDate] = useState('');
  const [newTodoEndDate, setNewTodoEndDate] = useState('');
  const [newTodoStatus, setNewTodoStatus] = useState('Pending');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/todos/');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/todos/', {
        subject: newTodoSubject,
        start_date: newTodoStartDate || null,
        end_date: newTodoEndDate || null,
        status: newTodoStatus,
      });
      setTodos([...todos, response.data]);
      setNewTodoSubject('');
      setNewTodoStartDate('');
      setNewTodoEndDate('');
      setNewTodoStatus('Pending');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}/`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">TODO App</h1>
      <div className="card mb-4">
        <div className="card-header">Add New Todo</div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              value={newTodoSubject}
              onChange={(e) => setNewTodoSubject(e.target.value)}
              placeholder="Enter todo subject"
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={newTodoStartDate}
                onChange={(e) => setNewTodoStartDate(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={newTodoEndDate}
                onChange={(e) => setNewTodoEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-select"
              id="status"
              value={newTodoStatus}
              onChange={(e) => setNewTodoStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={addTodo}>Add Todo</button>
        </div>
      </div>

      <h2 className="mb-3">Todo List</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.subject}</td>
              <td>{todo.start_date}</td>
              <td>{todo.end_date}</td>
              <td>{todo.status}</td>
              <td>
                <Link to={`/todos/${todo.id}`} className="btn btn-info btn-sm me-2">Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
