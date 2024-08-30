import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import { LiaKissWinkHeart } from "react-icons/lia";
import { Avatar, useDisclosure } from '@chakra-ui/react';
import { fetchAllThreads } from '../api/ajaxHelpers';

const NavbarButton = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`rounded-lg py-2 px-4 font-semibold text-base ${className}`}
  >
    {children}
  </button>
);

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [threads, setThreads] = useState([]);
  const username = localStorage.getItem('username');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    setIsAuthenticated(!!token);
  }, [setIsAuthenticated]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetchAllThreads();
        const fetchedThreads = response.threads;
        setThreads(fetchedThreads);
      } catch (error) {
        console.log("Trouble fetching all threads!", error);
      }
    };

    fetchThreads();
  }, [])

  const handleNavigation = (path) => () => navigate(path);

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    
    if (searchTerm) {
      const filteredResults = threads.filter(thread =>
        thread.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleResultClick = (result) => {
    navigate(`/thread/${result.id}`);
    setShowDropdown(false);
    setSearchTerm('');
  };

  return (
    <div className="flex w-full justify-between items-center mb-4">
      <div className='flex justify-center items-center'>
        <LiaKissWinkHeart size={35} onClick={handleNavigation('/')} />
        <h1 className='font-medium text-base ml-2'>grlhood</h1>
      </div>
      
      {isAuthenticated ? (
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a thread"
            className="p-2 border border-gray-300 rounded-lg w-[250px]"
          />
          {showDropdown && (
            <ul className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-60 overflow-y-auto shadow-lg z-10">
              {searchResults?.length ? (
                searchResults.map(result => (
                  <li 
                    key={result.id} 
                    className="p-1 cursor-pointer hover:border-[1px] hover:border-black text-sm rounded-lg"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.title}
                  </li>
                ))
              ) : (
                <li className="p-2">No results found</li>
              )}
            </ul>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          {['Home', 'Brand', 'FAQs'].map((text, index) => (
            <a 
              key={index}
              href={`/${text.toLowerCase()}`}
              className="font-medium text-lg mr-8 py-2 px-4 hover:bg-green hover:py-2 hover:px-4 hover:rounded-xl"
            >
              {text}
            </a>
          ))}
        </div>
      )}
      
      {isAuthenticated ? (
        <div className='flex items-center'>
          <Avatar 
            size='md' 
            name={username}  
            src='https://bit.ly/broken-link'
            onClick={onOpen}
          />
          <ProfileModal isOpen={isOpen} onClose={onClose} />
          <NavbarButton onClick={handleLogout} className="ml-3 bg-green text-white">
            Logout
          </NavbarButton>
        </div>
      ) : (
        <div className='flex'>
          <NavbarButton 
            onClick={handleNavigation('/login')} 
            className="hover:bg-green hover:text-white border-2 mr-3"
          >
            Login
          </NavbarButton>
          <NavbarButton 
            onClick={handleNavigation('/sign-up')} 
            className="bg-black text-white hover:bg-green"
          >
            Sign up
          </NavbarButton>
        </div>
      )}
    </div>
  );
};

export default Navbar;