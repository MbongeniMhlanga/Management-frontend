import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import '../../App.css';

function DashboardLayout() {
  const [departmentCount, setDepartmentCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    api.get('/departments')
      .then(res => setDepartmentCount(res.data.length))
      .catch(console.error);

    api.get('/employees')
      .then(res => setEmployeeCount(res.data.length))
      .catch(console.error);
  }, []);

  return (
    <div className="dashboard">
      {/* Liquid Background */}
      <div className="liquid-background"></div>

      {/* Hero Section */}
      <section className="dashboard-hero fade-up">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="accent">Falcorp</span>
          </h1>
          <p className="hero-subtitle">Your all-in-one management dashboard</p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="stats-section">
        <Link to="/departments" className="stat-card fade-up" style={{ animationDelay: '0.1s' }}>
          <i className="bi bi-building stat-icon"></i>
          <div>
            <h4 className="stat-label">Departments</h4>
            <h2 className="stat-value">{departmentCount}</h2>
          </div>
        </Link>

        <Link to="/employees" className="stat-card fade-up" style={{ animationDelay: '0.2s' }}>
          <i className="bi bi-people stat-icon"></i>
          <div>
            <h4 className="stat-label">Employees</h4>
            <h2 className="stat-value">{employeeCount}</h2>
          </div>
        </Link>
      </section>
    </div>
  );
}

export default DashboardLayout;
