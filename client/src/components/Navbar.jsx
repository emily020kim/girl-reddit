import { useNavigate } from 'react-router-dom';

import { LiaKissWinkHeart } from "react-icons/lia";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex w-full justify-between items-center">
      <div className='flex justify-center items-center'>
        <LiaKissWinkHeart size={35} className="text-cyan" onClick={handleClick}/>
        <h1 className='text-cyan font-medium text-base ml-2'>grlhood</h1>
      </div>
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
      <button
        onClick={handleSignUp}
        className="rounded-lg py-2 px-4 bg-cyan text-white font-medium text-base"
      >
        Login
      </button>
    </div>
  );
};

export default Navbar