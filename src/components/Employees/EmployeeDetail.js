import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department_id: '',
    role: '',
    salary: ''
  });
 
  useEffect(() => {
    api.get(`/employees/${id}`)
      .then(res => {
        setEmployee(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          department_id: res.data.department_id,
          role: res.data.role || '',
          salary: res.data.salary || ''
        });
      })
      .catch(() => alert('Employee not found'));

    api.get('/departments')
      .then(res => setDepartments(res.data))
      .catch(console.error);
  }, [id]);

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleUpdate = async () => {
    try {
      await api.patch(`/employees/${id}`, {
        ...formData,
        department_id: parseInt(formData.department_id),
        salary: parseFloat(formData.salary)
      });
      alert('Employee updated');
      navigate('/employees');
    } catch {
      alert('Error updating employee');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this employee?')) {
      try {
        await api.delete(`/employees/${id}`);
        alert('Employee deleted');
        navigate('/employees');
      } catch {
        alert('Error deleting employee');
      }
    }
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <section className="dashboard-hero fade-up" style={{ paddingBottom: '2rem' }}>
        <div className="hero-content">
          <h1 className="hero-title">
            Employee Details <span className="accent">Falcorp</span>
          </h1>
          <p className="hero-subtitle">Edit employee information</p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 600, margin: 'auto' }}>
        <div className="stat-card p-4" style={{ textAlign: 'left' }}>
          <h2>Edit Employee</h2>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input name="email" type="email" className="form-control" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Department:</label>
            <select name="department_id" className="form-select" value={formData.department_id} onChange={handleChange}>
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
          <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
