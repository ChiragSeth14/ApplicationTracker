import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddApplication from './components/AddApplication';
import ProgressAnalytics from './components/ProgressAnalytics';
import ApplicationDetails from './components/ApplicationDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-application" element={<AddApplication />} />
        <Route path="/progress-analytics" element={<ProgressAnalytics />} />
        <Route path="/application/:id" element={<ApplicationDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
