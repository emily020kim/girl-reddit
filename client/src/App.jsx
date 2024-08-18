import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Brand from './components/Brand';
import Faq from './components/Faq';
import Login from './components/Login';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App
