import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Brand from './components/Brand';
import Faq from './components/Faq';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import SingleThread from './components/SingleThread';

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
