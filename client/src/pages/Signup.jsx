import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { 
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { registerUser } from '../api/ajaxHelpers';

import cat from '../assets/signup-cat.jpg';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const handleConfirmClick = () => setShowConfirm(!showConfirm);

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
        navigate('/dashboard');
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
        <div className='flex flex-col p-3 justify-center items-center rounded-lg bg-[#e6e6ed] gap-3 shadow-md'>
          <h1 className='text-green font-medium text-3xl'>Welcome!</h1>
          <h3 className='text-sm w-2/3 mb-3 font-medium'>
            We&apos;re excited for you to join grlhood
          </h3>
          <Input 
            variant='outline' 
            focusBorderColor='#97c1a9'
            borderColor='darkgray'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              focusBorderColor='#97c1a9'
              borderColor='darkgray'
              type={show ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              focusBorderColor='#97c1a9'
              borderColor='darkgray'
              type={showConfirm ? 'text' : 'password'}
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleConfirmClick}>
                {showConfirm ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {passwordErrorMessage && (
            <div className="text-red-500 text-xs mt-1">
              {passwordErrorMessage}
            </div>
          )}
          <button 
            className='bg-green px-3 py-2 mb-2 text-white font-medium text-lg mt-4 rounded-lg'
            onClick={submitSignup}
          >
            Sign up
          </button>
          <Link 
            to='/login'
            className='text-xs underline'
          >
            Have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;