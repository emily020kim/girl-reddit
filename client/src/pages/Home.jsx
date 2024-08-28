import cats from '../assets/cats-landing.jpg';

const Home = () => {
  return (
    <div className='flex justify-between items-center my-28'>
      <div className="flex w-1/2 justify-center items-center">
        <img src={cats} className="w-2/3 h-2/3"/>
      </div>

      <div className='flex flex-col w-1/2 justify-center items-center'>
          <h1 className='text-5xl my-6 font-medium'>
            Conversations from one girl to another
          </h1>
          <h4 className='font-medium text-sm py-1 px-2 border-2 border-black rounded-md mt-6'>
            After all, we&apos;re just girls.
          </h4>
      </div>
    </div>
  );
};

export default Home;