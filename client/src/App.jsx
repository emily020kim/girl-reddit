import Navbar from './components/Navbar';
import './App.css';

function App() {

  return (
    <>
      <Navbar />
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
      </div>
    </>
  )
}

export default App
