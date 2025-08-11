import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get('/departments')
      .then(res => setDepartments(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="dashboard">
      <section className="dashboard-hero fade-up" style={{ paddingBottom: '2rem' }}>
        <div className="hero-content">
          <h1 className="hero-title">
            Departments <span className="accent">Falcorp</span>
          </h1>
          <p className="hero-subtitle">Manage your departments</p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 900, margin: 'auto' }}>
        <Link to="/departments/new" className="btn btn-primary mb-3 fade-up">
          Add Department
        </Link>
        <div className="row">
          {departments.map(dep => (
            <div className="col-md-4 mb-3 fade-up" key={dep.id}>
              <div
                className="stat-card "
                style={{ textAlign: 'left' }}
              >
                <div className="card-body">
                  <h5 className="card-title">{dep.name}</h5>
                  <Link
                    to={`/departments/${dep.id}`}
                    className="btn btn-outline-light btn-sm mt-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
