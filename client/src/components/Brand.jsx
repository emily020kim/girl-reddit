import cat from '../assets/cat.jpg';

const Brand = () => {
  return (
    <div className='flex w-full justify-center items-center my-40'>
      <div className='flex flex-col w-1/2 justify-center items-center'>
        <img src={cat} className='w-1/2 h-1/2'/>
        <h1 className='text-white text-sm mt-2'>
          Selfies of our users &#40;real&#41;
        </h1>
      </div>
      <div className='flex flex-col w-1/2 justify-start'>
        <h1 className='text-cyan font-medium text-4xl mb-4'>
          Grlhood's Mission
        </h1>
        <h4 className='flex items-center text-white text-lg'>
          Grlhood aspires to be a platform where any girl can be their authentic self.
          It always heartwarming to see girls help each other and cheer for one another.
          We will always be a girl at heart no matter our age. 
        </h4>
      </div>
    </div>
  );
};

export default Brand