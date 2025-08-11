import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const preselectedDeptId = queryParams.get('department_id') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department_id: preselectedDeptId,
    role: '',
    salary: ''
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get('/departments')
      .then(res => setDepartments(res.data))
      .catch(console.error);
  }, []);

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/employees', {
        ...formData,
        department_id: parseInt(formData.department_id),
        salary: parseFloat(formData.salary)
      });
      toast.success('Employee added successfully');
      setTimeout(() => navigate('/employees'), 1500);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Email exists, try another one');
      } else {
        toast.error('Error adding employee');
      }
    }
  };

  return (
    <div className="dashboard">
      <section className="dashboard-hero fade-up" style={{ paddingBottom: '2rem' }}>
        <div className="hero-content">
          <h1 className="hero-title">
            Add Employee <span className="accent">Falcorp</span>
          </h1>
          <p className="hero-subtitle">Fill in employee details</p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 600, margin: 'auto' }}>
        <div className="stat-card p-4" style={{ textAlign: 'left' }}>
          <h2>Add Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input name="email" type="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Department:</label>
              <select name="department_id" className="form-select" value={formData.department_id} onChange={handleChange} required>
                <option value="">Select department</option>
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Role:</label>
              <input name="role" className="form-control" value={formData.role} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Salary:</label>
              <input name="salary" type="number" className="form-control" value={formData.salary} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-success">Add</button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EmployeeForm;
