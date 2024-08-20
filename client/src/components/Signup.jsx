import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

import { registerUser } from '../api/ajaxHelpers';

import cat from '../assets/signup-cat.jpg';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const submitSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await registerUser(username, password);
    
      if (response.error) {
        setPasswordErrorMessage("Registration failed. Please try again.");
      } else {
        localStorage.setItem('user-token', response.token);
        setIsRegistered(true);
        navigate('/');
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setPasswordErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };  

  return (
    <div className='flex w-full justify-center items-center mt-48'>
      <div className='flex w-1/2'>
        <img src={cat} className='w-2/3 h-2/3'/>
      </div>
      <div className='flex w-1/2'>
        <div className='flex flex-col py-6 px-10 justify-center items-center rounded-lg bg-gray gap-3'>
          <h1 className='text-cyan font-medium text-2xl'>Welcome!</h1>
          <h3 className='text-white text-sm w-2/3 mb-3'>
            We&apos;re excited for you to join grlhood
          </h3>
          <TextField 
            id="username"
            label="Username" 
            variant="filled"
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ color: '#fff' }}
          />
          <TextField 
            id="password" 
            label="Password" 
            variant="filled"
            size="small"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ color: '#fff' }}
          />
          <TextField 
            id="confirm-password" 
            label="Confirm Password" 
            variant="filled"
            size="small"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ color: '#fff' }}
          />
          {passwordErrorMessage && (
            <div className="text-red-500 text-xs mt-1">
              {passwordErrorMessage}
            </div>
          )}
          <button 
            className='bg-cyan px-3 py-2 mb-2 text-white font-medium text-lg mt-4 rounded-lg'
            onClick={submitSignup}
          >
            Sign up
          </button>
          <Link 
            to='/login'
            className='text-xs text-white underline'
          >
            Have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;