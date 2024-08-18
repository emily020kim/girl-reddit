import React from 'react';
import { PiHandPeaceLight } from "react-icons/pi";

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center py-40'>
      <h4 className='text-white font-medium text-sm py-1 px-2 border-2 border-white rounded-lg uppercase'>
        im just a girl
      </h4>
      <div className='w-2/3 my-6'>
        <h1 className='text-cyan text-6xl'>
          Conversations and advice from one girl to another
        </h1>
      </div>
      <div className='w-1/3 my-5'>
        <h4 className='text-white text-base'>
          Join a welcoming community where girlhood is the center of your experience. 
          Only real answers here!
        </h4>
      </div>
      <button
        onClick={{}}
        className='flex justify-center items-center text-white text-lg font-medium py-2 px-3 border-2 border-cyan rounded-lg mt-12'
      >
        Join now <PiHandPeaceLight size={22} className='text-white ml-2'/>
      </button>
    </div>
  );
};

export default Home