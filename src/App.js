import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

import DepartmentList from './components/Departments/DepartmentList';
import DepartmentForm from './components/Departments/DepartmentForm';
import DepartmentDetail from './components/Departments/DepartmentDetail';

import EmployeeList from './components/Employees/EmployeeList';
import EmployeeForm from './components/Employees/EmployeeForm';
import EmployeeDetail from './components/Employees/EmployeeDetail';

import DashboardLayout from './components/Dashboard/DashboardLayout';

//import UpdateEmployee from './components/Employees/UpdateEmployee'

function App() {
  return (
    <Router>
      <Navbar />
      <div
        style={{
          padding: 20,
          minHeight: '100vh',
          backgroundColor: '#8d8f96ff',
          color: '#e0e0e0',
        }}
      >
        <Routes>
          <Route path="/" element={<DashboardLayout />} />

          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/new" element={<DepartmentForm />} />
          <Route path="/departments/:id" element={<DepartmentDetail />} />
                 
          {/**<Route path="/employees" element={<UpdateEmployee/>}/>*/}
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
