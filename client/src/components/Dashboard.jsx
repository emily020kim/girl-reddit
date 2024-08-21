import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchAllThreads } from "../api/ajaxHelpers";

import { FaPencil } from "react-icons/fa6";
import { GiBowTieRibbon } from "react-icons/gi";

const Dashboard = () => {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetchAllThreads();
        console.log("threads: ", response);
        setThreads(response.threads);
      } catch (error) {
        console.error("Failed to fetch all threads: ", error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4 mt-12">
      <div className="flex flex-col bg-zinc-700 rounded-lg p-3">
        <div className="flex items-center">
          <div className="bg-zinc-500 p-2 rounded-full">
            <FaPencil size={16} className="text-white"/>
          </div>
          <h1 className="text-xl text-white font-medium ml-2">Threads</h1>
        </div>
        <div className="h-[1px] bg-zinc-300 w-full my-3"></div>
        {threads?.length ? (
          threads.map((thread) => (
            <div key={thread.id} className="flex flex-col items-start w-full bg-zinc-500 rounded-md p-2 mb-2">
              <div className="flex items-center mb-2">
                <div className="bg-white p-1 rounded-full mr-2">
                  <GiBowTieRibbon size={15} className="text-pink-300"/>
                </div>
                <p className="text-white text-sm font-medium">
                  username
                </p>
              </div>
              <h1 className="text-white text-base mb-3">{thread.title}</h1>
              <button
                onClick={() => navigate(`/thread/${thread.id}`)}
                className="bg-white rounded-lg py-1 px-2 text-sm font-medium border-[1px] border-cyan text-cyan"
              >
                See thread
              </button>
            </div>
          ))
        ) : (
          <p className="text-white">No threads available.</p>
        )}
      </div>
      <div className="flex flex-col items-center bg-zinc-700 rounded-lg p-3">
        <button 
          onClick={{}}
          className="w-2/3 bg-cyan text-white text-base font-medium py-1 px-2 rounded-md"
        >
          Start a thread
        </button>
      </div>
    </div>
  );
};

export default Dashboard;