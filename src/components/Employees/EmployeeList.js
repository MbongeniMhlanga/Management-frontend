import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    api.get('/employees').then(res => {
      setEmployees(res.data);
      setFilteredEmployees(res.data);
    }).catch(console.error);

    api.get('/departments').then(res => {
      setDepartments(res.data);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    let result = [...employees];

    if (search) {
      result = result.filter(emp =>
        emp.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDept) {
      result = result.filter(emp => emp.department_id === parseInt(selectedDept));
    }

    setFilteredEmployees(result);
  }, [search, selectedDept, employees]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      api.delete(`/employees/${id}`).then(() => {
        setEmployees(prev => prev.filter(emp => emp.id !== id));
        toast.success('Employee deleted successfully');
      }).catch(error => {
        console.error(error);
        toast.error('Error deleting employee');
      });
    }
  };

  const handleSortByDepartment = () => {
    const sorted = [...filteredEmployees].sort((a, b) => {
      const deptA = a.department_name || '';
      const deptB = b.department_name || '';
      return sortAsc ? deptA.localeCompare(deptB) : deptB.localeCompare(deptA);
    });
    setFilteredEmployees(sorted);
    setSortAsc(!sortAsc);
  };

  return (
    <div className="dashboard">
      <section className="dashboard-hero fade-up" style={{ paddingBottom: '2rem' }}>
        <div className="hero-content">
          <h1 className="hero-title">
            Employees <span className="accent">Falcorp</span>
          </h1>
          <p className="hero-subtitle">Manage your employees</p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 900, margin: 'auto' }}>
        <ToastContainer />
        <Link to="/employees/new" className="btn btn-primary mb-3 fade-up">
          Add Employee
        </Link>

        <div className="mb-3 d-flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search by email..."
            className="form-control"
            style={{ maxWidth: 300 }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            style={{ maxWidth: 300 }}
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
          <button onClick={handleSortByDepartment} className="btn btn-secondary">
            Sort by Department {sortAsc ? '▲' : '▼'}
          </button>
        </div>

        <div className="stat-card p-3" style={{ overflowX: 'auto' }}>
          <table className="table table-striped table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.department_name || 'N/A'}</td>
                    <td className="text-center">
                      <div className="btn-group">
                        <Link to={`/employees/${emp.id}`} className="btn btn-outline-info btn-sm">View</Link>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(emp.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : selectedDept ? (
                <tr>
                  <td colSpan="3" className="text-center text-warning">
                    No employees found in the selected department.
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
