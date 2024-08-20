import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

import { userLogin } from '../api/ajaxHelpers';

import cat from '../assets/login-cat.jpg';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(username, password);
  
      if (response.error) {
        setPasswordErrorMessage("Username or password incorrect. Please try again.");
      } else {
        localStorage.setItem('user-token', response.token);
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setPasswordErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className='flex w-full justify-center items-center mt-48'>
      <div className='flex w-1/2'>
        <img src={cat} className='w-2/3 h-2/3' alt="Login cat" />
      </div>
      <div className='flex w-1/2'>
        <div className='flex flex-col py-6 justify-center items-center rounded-lg bg-gray gap-3'>
          <h1 className='text-cyan font-medium text-2xl'>Login</h1>
          <h3 className='text-white text-sm w-2/3 mb-3'>
            Get support from fellow girls and make friends along the way
          </h3>
          <TextField 
            id="username"
            label="Username"
            variant="filled"
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ color: '#fff', input: { color: '#fff' } }}
          />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ color: '#fff', input: { color: '#fff' } }}
          />
          {passwordErrorMessage && (
            <div className='text-red-500 text-xs mt-2'>
              {passwordErrorMessage}
            </div>
          )}
          <button 
            className='bg-cyan px-3 py-2 mb-2 text-white font-medium text-lg mt-4 rounded-lg'
            onClick={submitLogin}
          >
            Login
          </button>
          <Link 
            to='/sign-up'
            className='text-xs text-white underline mt-2'
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;