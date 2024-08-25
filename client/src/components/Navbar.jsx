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

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/sign-up');
  };

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user-token');
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
        <LiaKissWinkHeart size={35} onClick={handleClick}/>
        <h1 className='font-medium text-base ml-2'>grlhood</h1>
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
              className="ml-2 p-2 bg-green text-white font-medium rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <a 
            href="/"
            className="font-medium text-lg mr-8 py-2 px-4 hover:bg-green hover:py-2 hover:px-4 hover:rounded-xl"
          >
            Home
          </a>
          <a 
            href="/brand"
            className="font-medium text-lg mr-8 py-2 px-4 hover:bg-green hover:py-2 hover:px-4 hover:rounded-xl"
          >
            Brand
          </a>
          <a 
            href="/faq"
            className="font-medium text-lg py-2 px-4 hover:bg-green hover:py-2 hover:px-4 hover:rounded-xl"
          >
            FAQs
          </a>
        </div>
      )}
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="rounded-lg py-2 px-4 font-semibold text-base bg-green text-white"
        >
          Logout
        </button>
      ) : (
        <div className='flex'>
          <button
            onClick={handleLogin}
            className="rounded-lg py-2 px-4 font-semibold text-base hover:bg-green hover:text-white border-2 mr-3"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="rounded-lg py-2 px-4 font-semibold text-base bg-black text-white hover:bg-green"
          >
            Sign up
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;