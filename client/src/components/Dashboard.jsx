import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchAllThreads } from "../api/ajaxHelpers";

import { FaPencil } from "react-icons/fa6";
import { GiBowTieRibbon } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi2";

const Dashboard = () => {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetchAllThreads();
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
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="bg-zinc-500 p-2 rounded-full">
              <FaPencil size={16} className="text-white"/>
            </div>
            <h1 className="text-xl text-white font-medium ml-2">Threads</h1>
          </div>
          <button 
            onClick={() => navigate('/create-thread')}
            className="bg-cyan text-white text-base font-medium rounded-lg py-1 px-2"
          >
            Create new thread
          </button>
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
      <div className="flex flex-col self-start items-start bg-zinc-700 rounded-lg p-3">
        <h1 className="text-cyan font-medium text-2xl text-center mb-4">
          Grlhood Rules
        </h1>
        <h3 className="text-white text-base mb-2">
          1. Be respectful
        </h3>
        <h3 className="text-white text-base mb-2">
          2. Report problematic behavior
        </h3>
        <h3 className="flex items-center text-white text-base">
          3. Stay classy <HiSparkles size={15} className="text-yellow-300 ml-1"/>
          , stay demure <GiBowTieRibbon size={15} className="text-pink-300 ml-1"/>
        </h3>
      </div>
    </div>
  );
};

export default Dashboard;