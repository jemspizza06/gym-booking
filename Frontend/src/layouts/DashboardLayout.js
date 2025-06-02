// src/layouts/DashboardLayout.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="app-layout">
      <Sidebar role={user?.role} />
      <div className="main-content">
        <Header user={user} />
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
