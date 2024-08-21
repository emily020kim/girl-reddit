import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchSingleThread, fetchAllReplies } from "../api/ajaxHelpers";

import { GiBowTieRibbon } from "react-icons/gi";

const SingleThread = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchThreadAndReplies = async () => {
      try {
        const threadResponse = await fetchSingleThread(id);
        setThread(threadResponse.thread);

        const allRepliesResponse = await fetchAllReplies();
        
        const filteredReplies = allRepliesResponse.replies.filter((reply) => {
          const isEqual = String(reply.thread_id) === String(id);
          return isEqual;
        });
        setReplies(filteredReplies);
      } catch (error) {
        console.error("Failed to fetch thread or replies: ", error);
      }
    };

    fetchThreadAndReplies();
  }, [id]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-zinc-700 w-full items-start rounded-lg p-3 mt-12 mb-3">
        <div className="flex items-center mb-2">
          <div className="bg-white p-1 rounded-full mr-2">
            <GiBowTieRibbon size={15} className="text-pink-300"/>
          </div>
          <p className="text-white text-sm font-medium">
            username
          </p>
        </div>
        <h1 className="text-white font-medium text-xl mb-3">
          {thread?.title}
        </h1>
        <h6 className="text-white text-sm mb-4">
          {thread?.content}
        </h6>
        <button
          onClick={{}}
          className="bg-white rounded-lg py-1 px-2 text-sm font-medium border-[1px] border-cyan text-cyan"
        >
          Reply
        </button>
      </div>

      {replies?.length ? (
        replies.map((reply) => (
          <div key={reply.id} className="flex flex-col items-start w-full bg-zinc-600 rounded-md p-2 mb-3">
            <p className="text-white text-sm">
              {reply?.content}
            </p>
          </div>
        ))
      ) : (
        <p className="text-white">No replies yet.</p>
      )}
    </div>
  );
};

export default SingleThread;