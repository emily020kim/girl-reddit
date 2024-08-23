import { FaHeart } from "react-icons/fa";
import { RiCopyrightLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className='flex justify-center items-center w-full py-3 fixed bottom-0 left-0'>
      <h1 className='flex justify-center items-center text-sm'>
        Made with love <FaHeart size={12} className='text-green mx-2'/>
        Copyright <RiCopyrightLine size={12} className='text-green mx-2'/> 2024
      </h1>
    </div>
  );
};

export default Footer