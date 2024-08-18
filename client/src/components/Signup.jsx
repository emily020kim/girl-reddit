import TextField from '@mui/material/TextField';

import cat from '../assets/signup-cat.jpg';

const Signup = () => {
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
            id="filled-basic"
            label="Username" 
            variant="filled"
            size="small"
            sx={{ color: '#fff' }}
          />
          <TextField 
            id="filled-basic" 
            label="Password" 
            variant="filled"
            size="small"
            sx={{ color: '#fff' }}
          />
          <TextField 
            id="filled-basic" 
            label="Confirm Password" 
            variant="filled"
            size="small"
            sx={{ color: '#fff' }}
          />
          <button className='bg-cyan px-3 py-2 mb-2 text-white font-medium text-lg mt-4 rounded-lg'>
            Sign up
          </button>
          <a 
            href='/login'
            className='text-xs text-white underline'
          >
            Have an account?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup