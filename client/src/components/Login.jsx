import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { 
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { userLogin } from '../api/ajaxHelpers';

import cat from '../assets/login-cat.jpg';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(username, password);
      
      if (response.error) {
        setPasswordErrorMessage("Username or password incorrect. Please try again.");
      } else {
        localStorage.setItem('user-token', response.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
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
        <div className='flex flex-col justify-center items-center rounded-lg bg-[#e6e6ed] p-3 gap-3 shadow-md'>
          <h1 className='text-green font-medium text-3xl'>Login</h1>
          <h3 className='text-sm w-2/3 mb-3 font-medium'>
            Get support from fellow girls and make friends along the way
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
          {passwordErrorMessage && (
            <div className='text-red-500 text-xs mt-2'>
              {passwordErrorMessage}
            </div>
          )}
          <button 
            className='bg-green px-3 py-2 mb-2 text-white font-medium text-lg mt-4 rounded-lg'
            onClick={submitLogin}
          >
            Login
          </button>
          <Link 
            to='/sign-up'
            className='text-xs underline mt-2'
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;