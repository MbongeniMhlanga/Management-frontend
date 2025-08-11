import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';

const UpdateEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get('/employee')
      .then(res => setEmployees(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-3">Employees</h2>
      <Link to="/employees/new" className="btn btn-primary mb-4 fade-up">
        Add Employee
      </Link>
      <div className="row">
        {employees.map(emp => (
          <div className="col-md-4 mb-3 fade-up" key={emp.id}>
            <div className="stat-card" style={{ textAlign: 'left' }}>
              <h5>{emp.name}</h5>
              <Link to={`/employees/${emp.id}`} className="btn btn-outline-light btn-sm mt-2">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateEmployee;
