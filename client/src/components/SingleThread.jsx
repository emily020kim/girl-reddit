import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchSingleThread, fetchAllReplies, createReply } from "../api/ajaxHelpers";

import { GiBowTieRibbon } from "react-icons/gi";
import { FaArrowLeft } from "react-icons/fa";

const SingleThread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);

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

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleReplySubmit = async () => {
    if (replyContent.trim() === "") return;
    try {
      const newReply = await createReply(replyContent, id);
      setReplies([...replies, newReply]);
      setReplyContent("");
      setIsReplying(false);
    } catch (error) {
      console.error("Failed to post reply:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-zinc-700 w-full items-start rounded-lg p-3 mt-12 mb-3">
        <div 
          onClick={() => navigate('/dashboard')}
          className="flex items-center mb-6"
        >
          <FaArrowLeft size={20} className="text-white mr-2"/>
          <p className="text-white text-xs">
            Back to dashboard
          </p>
        </div>
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
          onClick={handleReplyClick}
          className="bg-white rounded-lg py-1 px-2 text-sm font-medium border-[1px] border-cyan text-cyan"
        >
          Reply
        </button>
        {isReplying && (
          <div className="mt-3 w-full">
            <textarea
              className="w-full p-2 rounded-md bg-zinc-600 text-white"
              placeholder="Type your reply here..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <button
              onClick={handleReplySubmit}
              className="bg-cyan rounded-lg py-1 px-2 text-sm font-medium mt-2 text-white"
            >
              Post Reply
            </button>
          </div>
        )}
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