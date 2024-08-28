import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Brand from './pages/Brand';
import Faq from './pages/Faq';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SingleThread from './pages/SingleThread';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='flex justify-center'>
      <div className='max-w-screen-xl h-screen'>
        <Router>
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/thread/:id" element={<SingleThread />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
};

export default App;
