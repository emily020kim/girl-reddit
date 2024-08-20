import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LiaKissWinkHeart } from "react-icons/lia";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Search logic can be placed here
    console.log("Search Term:", searchTerm);
    // Example: Redirect to search results page
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div className="flex w-full justify-between items-center mb-4">
      <div className='flex justify-center items-center'>
        <LiaKissWinkHeart size={35} className="text-cyan" onClick={handleClick}/>
        <h1 className='text-cyan font-medium text-base ml-2'>grlhood</h1>
      </div>
      {isAuthenticated ? (
        <div className='flex justify-center items-center'>
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-cyan text-white rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <a 
            href="/"
            className="text-white font-medium text-lg mr-8 py-2 px-4 hover:bg-cyan hover:py-2 hover:px-4 hover:rounded-xl"
          >
            Home
          </a>
          <a 
            href="/brand"
            className="text-white font-medium text-lg mr-8 py-2 px-4 hover:bg-cyan hover:py-2 hover:px-4 hover:rounded-xl"
          >
            Brand
          </a>
          <a 
            href="/faq"
            className="text-white font-medium text-lg py-2 px-4 hover:bg-cyan hover:py-2 hover:px-4 hover:rounded-xl"
          >
            FAQs
          </a>
        </div>
      )}
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="rounded-lg py-2 px-4 bg-white text-cyan font-medium text-base"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleSignUp}
          className="rounded-lg py-2 px-4 bg-cyan text-white font-medium text-base"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;