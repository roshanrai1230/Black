import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Careers from './pages/Careers';
// import CompanyInfo from './pages/CompanyInfo';
import Contact from './pages/Contact';
import ProjectsPage from './pages/ProjectsPage';
import ServiceDetail from './pages/ServiceDetail';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContactMessages from './pages/admin/AdminContactMessages';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Site Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          {/* <Route path="/company-info" element={<CompanyInfo />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="messages" element={<AdminContactMessages />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
