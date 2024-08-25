import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { fetchAllThreads, createThread } from "../api/ajaxHelpers";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button, 
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';

import { FaPencil } from "react-icons/fa6";
import { GiBowTieRibbon } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi2";

const Dashboard = () => {
  const [threads, setThreads] = useState([]);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)

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

  const handleCreateThread = async () => {
    if (newThreadTitle.trim() === "" || newThreadContent.trim() === "") return;

    const user_id = localStorage.getItem("id");
    const date = new Date().toISOString();

    try {
      const newThread = await createThread(user_id, newThreadTitle, newThreadContent, date);
      if (newThread) {
        setThreads((prevThreads) => [...prevThreads, newThread]);
        onClose(); 
      }
    } catch (err) {
      setError(err.message || "Failed to create thread");
      console.error("Error creating thread:", err);
    }
  };

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4 mt-12">
      <div className="flex flex-col bg-[#e6e6ed] rounded-lg p-3 shadow">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="bg-green p-2 rounded-full">
              <FaPencil size={16} className="text-white"/>
            </div>
            <h1 className="text-xl text-green font-medium ml-2">Threads</h1>
          </div>
          <button 
            onClick={onOpen}
            className="bg-green text-white text-base font-medium rounded-lg py-1 px-2"
          >
            Create new thread
          </button>
        </div>
        <div className="h-[1px] bg-zinc-300 w-full my-3"></div>
        {threads?.length ? (
          threads.map((thread) => (
            <div key={thread.id} className="flex flex-col items-start w-full bg-green rounded-md p-2 mb-2">
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
                className="bg-white rounded-lg py-1 px-2 text-sm font-medium border-[1px] border-green text-green"
              >
                See thread
              </button>
            </div>
          ))
        ) : (
          <p className="text-white">No threads available.</p>
        )}
      </div>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new Thread</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter thread title"
                value={newThreadTitle}
                focusBorderColor='#97c1a9'
                borderColor='darkgray'
                onChange={(e) => setNewThreadTitle(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder="Enter thread content"
                value={newThreadContent}
                focusBorderColor='#97c1a9'
                borderColor='darkgray'
                onChange={(e) => setNewThreadContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button bgColor="#97c1a9" color="white" mr={3} onClick={handleCreateThread}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="flex flex-col self-start items-start bg-[#e6e6ed] rounded-lg p-3 shadow-md">
        <h1 className="text-green font-medium text-2xl text-center mb-4">
          Grlhood Rules
        </h1>
        <h3 className="text-green text-base mb-2">
          1. Be respectful
        </h3>
        <h3 className="text-green text-base mb-2">
          2. Report problematic behavior
        </h3>
        <h3 className="flex items-center text-green text-base">
          3. Stay classy <HiSparkles size={15} className="text-yellow-300 ml-1"/>
          , stay demure <GiBowTieRibbon size={15} className="text-pink-300 ml-1"/>
        </h3>
      </div>
    </div>
  );
};

export default Dashboard;