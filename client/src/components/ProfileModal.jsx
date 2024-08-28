import { useEffect, useState } from "react";
import { fetchAllThreads, deleteThread } from "../api/ajaxHelpers";
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
  Avatar,
  Stack,
  VStack,
  Text,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { BsThreeDots } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

const ProfileModal = ({ isOpen, onClose }) => {
  const [threads, setThreads] = useState([]);
  const [showThreads, setShowThreads] = useState(false);
  const [popupState, setPopupState] = useState({ visible: false, threadId: null });

  const username = localStorage.getItem('username');
  const userId = parseInt(localStorage.getItem('id'), 10);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetchAllThreads();
        const userThreads = response.threads.filter(thread => thread.user_id === userId);
        setThreads(userThreads);
      } catch (error) {
        console.error("Failed to fetch all threads: ", error);
      }
    };
    fetchThreads();
  }, [userId]);

  const handleToggleThreads = () => {
    setShowThreads(!showThreads);
  };

  const togglePopup = (threadId) => {
    setPopupState(prevState => ({
      visible: !(prevState.visible && prevState.threadId === threadId),
      threadId: prevState.threadId === threadId ? null : threadId
    }));
  };

  const handleDelete = async (threadId) => {
    try {
      const response = await deleteThread(threadId);
      if (response && response.success) {
        setThreads(prevThreads => prevThreads.filter(thread => thread.id !== threadId));
        setPopupState({ visible: false, threadId: null });
      } else {
        console.error("Failed to delete thread");
      }
    } catch (error) {
      console.error("Error deleting thread:", error);
    }
  };  

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Profile picture</FormLabel>
            <Stack direction='row' alignItems='center'>
              <Avatar size="xl" name={username} src="https://bit.ly/broken-link" mb={4} />
              <Button colorScheme="blue" mr={3}>Change picture</Button>
              <Button colorScheme="red">Delete picture</Button>
            </Stack>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input placeholder={username} isReadOnly />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>See my threads</FormLabel>
            <Button colorScheme='green' onClick={handleToggleThreads}>
              {showThreads ? "Hide" : "Show all"}
            </Button>
          </FormControl>

          {showThreads && (
            <VStack align="start" spacing={2} mt={4}>
              {threads.length ? (
                threads.map(thread => (
                  <Card key={thread.id} mb={2} bgColor='#97c1a9' size='sm'>
                    <CardBody>
                      <div className="flex flex-col">
                        <div className="flex justify-end">
                        <BsThreeDots 
                          size={20}
                          className="text-white cursor-pointer"
                          onClick={() => togglePopup(thread.id)}
                        />
                        </div>
                        {popupState.visible && popupState.threadId === thread.id && (
                          <div
                            className="absolute right-0 bg-white text-black rounded shadow-lg z-10"
                            style={{ top: '100%', transform: 'translateY(-50%)' }}
                          >
                            <button
                              className="flex items-center px-4 py-2 text-sm hover:bg-gray-200"
                              onClick={() => handleDelete(thread.id)}
                            >
                              <FaTrashAlt size={15} className="text-red-600 mr-1" /> Delete
                            </button>
                          </div>
                        )}
                        <Text fontSize='sm' color='white'>{thread.title}</Text>
                      </div>
                    </CardBody>
                  </Card>
                ))
              ) : (
                <Text>No threads found.</Text>
              )}
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <Button mr={3}>Save changes</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;