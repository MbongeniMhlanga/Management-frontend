import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DepartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [name, setName] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get(`/departments/${id}`)
      .then(res => {
        setDepartment(res.data);
        setName(res.data.name);
      })
      .catch(() => alert('Department not found'));

    api.get(`/departments/${id}/employees`)
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Error fetching employees:', err));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.patch(`/departments/${id}`, { name });
      alert('Department updated');
      navigate('/departments');
    } catch {
      alert('Error updating department');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this department?')) {
      try {
        await api.delete(`/departments/${id}`);
        alert('Department deleted');
        navigate('/departments');
      } catch {
        alert('Error deleting department');
      }
    }
  };

  if (!department) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <section className="dashboard-hero fade-up" style={{ paddingBottom: '2rem' }}>
        <div className="hero-content">
          <h1 className="hero-title">
            Edit Department <span className="accent">Falcorp</span>
          </h1>
          <p className="hero-subtitle">Manage your departments</p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 800, margin: 'auto' }}>
        <div
          className="stat-card mb-4 fade-up"
          style={{ textAlign: 'left' }}
        >
          <h2>Edit Department</h2>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <button className="btn btn-success me-2" onClick={handleUpdate}>
            Save
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>

        <div
          className="stat-card fade-up"
          style={{ textAlign: 'left' }}
        >
          <h3>Employees in this Department</h3>
          {employees.length === 0 ? (
            <p>No employees found in this department.</p>
          ) : (
        <ul className="list-group list-group-flush" style={{ background: 'transparent' }}>
  {employees.map(emp => (
    <li
      key={emp.id}
      className="list-group-item"
      style={{
        background: 'transparent',
        color: 'white',
        border: 'none',
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <Link to={`/employees/${emp.id}`} className="text-info">
        {emp.name}
      </Link>
    </li>
  ))}
</ul>

          )}
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate(`/employees/new?department_id=${id}`)}
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
