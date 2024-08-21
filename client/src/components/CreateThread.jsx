import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createThread } from '../api/ajaxHelpers';
import { useNavigate } from 'react-router-dom';

const CreateThread = () => {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (title.trim() === "" || content.trim() === "") return;
  
    const user_id = localStorage.getItem("id");
    const date = new Date().toISOString();
  
    try {
      const newThread = await createThread(user_id, title, content, date);
      setThreads([...threads, newThread]);
      if (newThread) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to create thread');
      console.error('Error creating thread:', err);
    }
  };

  return (
    <div className="flex justify-center mt-24">  
      <div className="flex flex-col w-1/2 bg-zinc-700 rounded-lg p-3">
        <h1 className="text-2xl text-cyan font-medium mb-4">
          Create thread
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <TextField 
          id="title"
          label="Title"
          variant="filled"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ color: '#fff', input: { color: '#fff' } }}
          fullWidth
          margin="normal"
        />
        <TextField 
          id="content"
          label="Content"
          variant="filled"
          size="small"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ color: '#fff', input: { color: '#fff' } }}
          fullWidth
          margin="normal"
        />
        <button
          onClick={handleCreate}
          className='bg-cyan text-white text-base font-medium py-1 px-2 rounded-lg mt-4'
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateThread;