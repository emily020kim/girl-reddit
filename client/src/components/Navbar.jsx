import { LiaKissWinkHeart } from "react-icons/lia";

const Navbar = () => {
  return (
    <div className="flex w-full justify-between items-center">
      <LiaKissWinkHeart size={35} className="text-cyan"/>
      <div className="flex justify-center items-center">
        <a 
          href="/"
          className="text-white font-medium text-lg mr-8 py-2 px-4 hover:bg-cyan hover:py-2 hover:px-4 hover:rounded-xl"
        >
          About
        </a>
        <a 
          href="#"
          className="text-white font-medium text-lg mr-8 py-2 px-4 hover:bg-cyan hover:py-2 hover:px-4 hover:rounded-xl"
        >
          Brand
        </a>
        <a 
          href="#"
          className="text-white font-medium text-lg py-2 px-4 hover:bg-cyan hover:py-2 hover:px-4 hover:rounded-xl"
        >
          Join Us
        </a>
      </div>
      <button
        href="#"
        className="rounded-lg py-2 px-4 bg-cyan text-white font-medium text-base"
      >
        Sign Up
      </button>
    </div>
  );
};

export default Navbar