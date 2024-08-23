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
import CreateThread from './components/CreateThread';

function App() {

  return (
    <div className='flex justify-center'>
      <div className='max-w-screen-xl h-screen'>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/thread/:id" element={<SingleThread />} />
            <Route path="/create-thread" element={<CreateThread />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
};

export default App;
