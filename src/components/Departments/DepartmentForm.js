import React, { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DepartmentForm = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/departments', { name });
      toast.success('✅ Department added successfully');
      setTimeout(() => navigate('/departments'), 1500);
    } catch (error) {
      toast.error('❌ Department already exists, please add another department');
    }
  };

  return (
    <div className="dashboard">
      <section className="dashboard-hero fade-up" style={{ paddingBottom: '2rem' }}>
        <div className="hero-content">
          <h1 className="hero-title">
            Add Department <span className="accent">Falcorp</span>
          </h1>
          <p className="hero-subtitle">Create new department</p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 600, margin: 'auto' }}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
        />
        <div
          className="stat-card shadow rounded-4 fade-up"
          style={{ textAlign: 'left' }}
        >
          <h2 className="mb-4">Add Department</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Department Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter department name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success px-4">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepartmentForm;
