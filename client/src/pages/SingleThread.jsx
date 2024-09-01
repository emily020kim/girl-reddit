import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  fetchSingleThread,
  fetchAllReplies, 
  createReply,
  editReply,
  deleteReply, 
  fetchAllUsers,
} from "../api/ajaxHelpers";
import { GiBowTieRibbon } from "react-icons/gi";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

const SingleThread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReplyContent, setEditingReplyContent] = useState("");
  const [username, setUsername] = useState("");
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  useEffect(() => {
    const fetchThreadData = async () => {
      try {
        const threadResponse = await fetchSingleThread(id);
        const threadData = threadResponse.thread;
        setThread(threadData);
        
        const threadUserId = threadData.user_id;
        const allUsersResponse = await fetchAllUsers();
        const user = allUsersResponse.users.find((user) => user.id === threadUserId);
        if (user) {
          setUsername(user.username);
        } else {
          console.error("User not found");
        }
    
        const allRepliesResponse = await fetchAllReplies();
        const filteredReplies = allRepliesResponse.replies.filter(
          (reply) => String(reply.thread_id) === String(id)
        );
  
        const enrichedReplies = filteredReplies.map((reply) => {
          const replyUser = allUsersResponse.users.find((user) => user.id === reply.user_id);
          return {
            ...reply,
            username: replyUser ? replyUser.username : "Unknown User",
          };
        });
  
        setReplies(enrichedReplies);
      } catch (error) {
        console.error("Failed to fetch thread data:", error);
      }
    };
  
    fetchThreadData();
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

  const handleCancelReply = () => {
    setReplyContent("");
    setIsReplying(false);
  };

  const togglePopup = (replyId) => {
    if (selectedReplyId === replyId && isPopupVisible) {
      setPopupVisible(false);
      setSelectedReplyId(null);
    } else {
      setPopupVisible(true);
      setSelectedReplyId(replyId);
    }
  };

  const handleEdit = (replyId, currentContent) => {
    setIsEditing(true);
    setSelectedReplyId(replyId);
    setEditingReplyContent(currentContent);
    setPopupVisible(false);
  };

  const handleEditSubmit = async () => {
    if (editingReplyContent.trim() === "") return;
  
    try {
      const currentDate = new Date().toISOString();
      const replyToEdit = replies.find(reply => reply.id === selectedReplyId);
  
      if (!replyToEdit) {
        throw new Error('Reply not found');
      }
  
      const updatedReply = await editReply(selectedReplyId, replyToEdit.user_id, id, editingReplyContent, currentDate);
  
      if (!updatedReply || !updatedReply.content) {
        throw new Error('Failed to retrieve updated content');
      }
  
      const updatedReplies = replies.map((reply) =>
        reply.id === selectedReplyId ? { ...reply, content: updatedReply.content } : reply
      );
  
      setReplies(updatedReplies);
      setIsEditing(false);
      setSelectedReplyId(null);
    } catch (error) {
      console.error("Failed to edit reply:", error);
    }
  };  

  const handleDeleteClick = (replyId) => {
    setSelectedReplyId(replyId);
    setIsConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteReply(selectedReplyId);
      if (response && response.success) {
        const updatedReplies = replies.filter(reply => reply.id !== selectedReplyId);
        setReplies(updatedReplies);
        setSelectedReplyId(null);
        setIsConfirmVisible(false);
      } else {
        console.error("Failed to delete reply");
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmVisible(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-green w-full items-start rounded-lg p-3 mt-12 mb-3 shadow-md">
        <div onClick={() => navigate('/dashboard')} className="flex items-center mb-6">
          <FaArrowLeft size={20} className="text-white mr-2" />
          <p className="text-white text-xs">Back to dashboard</p>
        </div>

        <div className="flex items-center mb-2">
          <div className="bg-white p-1 rounded-full mr-2">
            <GiBowTieRibbon size={15} className="text-pink-300" />
          </div>
          <p className="text-white text-sm font-medium">{username}</p>
        </div>
        <h1 className="text-white font-medium text-xl mb-3">{thread?.title}</h1>
        <h6 className="text-white text-start text-sm mb-4">{thread?.content}</h6>

        <button onClick={handleReplyClick} className="bg-white rounded-lg py-1 px-2 text-sm font-medium border-[1px] border-cyan text-cyan">
          Reply
        </button>

        {isReplying && (
          <div className="mt-3 w-full">
            <textarea
              className="w-full p-2 rounded-md bg-white"
              placeholder="Type your reply here..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <button onClick={handleReplySubmit} className="rounded-lg py-1 px-2 text-sm font-medium mt-2 text-green bg-white mr-3">
              Post Reply
            </button>
            <button onClick={handleCancelReply} className="rounded-lg py-1 px-2 text-sm font-medium mt-2 text-red-600 bg-white">
              Cancel
            </button>
          </div>
        )}
      </div>

      {replies?.length ? (
        replies.map((reply) => (
          <div key={reply.id} className="flex flex-col items-start w-full bg-green rounded-md py-3 px-6 mb-3 relative shadow-sm">
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center mb-2">
                <div className="bg-white p-1 rounded-full mr-2">
                  <GiBowTieRibbon size={15} className="text-pink-300" />
                </div>
                <p className="text-white text-sm font-medium">{reply.username}</p>
              </div>

              <BsThreeDots
                size={20}
                className="text-white cursor-pointer"
                onClick={() => togglePopup(reply.id)}
              />

              {isPopupVisible && selectedReplyId === reply.id && (
                <div
                  className="absolute right-0 bg-white text-black rounded shadow-lg z-10"
                  style={{ top: '100%', transform: 'translateY(-50%)' }}
                >
                  <button
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => handleEdit(reply.id, reply.content)}
                  >
                    <MdEdit size={15} className="text-black mr-1" /> Edit
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => handleDeleteClick(reply.id)}
                  >
                    <FaTrashAlt size={15} className="text-red-600 mr-1" /> Delete
                  </button>
                </div>
              )}
            </div>

            <h6 className="text-white text-start text-sm mb-2">{reply.content}</h6>

            {isEditing && selectedReplyId === reply.id && (
              <div className="mt-3 w-full">
                <textarea
                  className="w-full p-2 rounded-md bg-white"
                  placeholder="Edit your reply here..."
                  value={editingReplyContent}
                  onChange={(e) => setEditingReplyContent(e.target.value)}
                />
                <button onClick={handleEditSubmit} className="rounded-lg py-1 px-2 text-sm font-medium mt-2 text-green bg-white mr-3">
                  Save
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-white text-center mt-6">No replies yet</p>
      )}

      {isConfirmVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-black mb-4">Are you sure you want to delete this reply?</p>
            <button
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
            >
              Yes, delete it
            </button>
            <button
              onClick={handleCancelDelete}
              className="bg-gray-300 text-black py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleThread;