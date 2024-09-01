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
  const [state, setState] = useState({
    threads: [],
    showThreads: false,
    popupState: { visible: false, threadId: null },
    confirmDelete: { visible: false, threadId: null },
  });  

  const { threads, showThreads, popupState, confirmDelete } = state;

  const username = localStorage.getItem('username');
  const userId = parseInt(localStorage.getItem('id'), 10);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetchAllThreads();
        const userThreads = response.threads.filter(thread => thread.user_id === userId);
        setState(prevState => ({ ...prevState, threads: userThreads }));
      } catch (error) {
        console.error("Failed to fetch all threads: ", error);
      }
    };
    fetchThreads();
  }, [userId]);

  const handleToggleThreads = () => {
    setState(prevState => ({ ...prevState, showThreads: !prevState.showThreads }));
  };

  const togglePopup = (threadId) => {
    setState(prevState => ({
      ...prevState,
      popupState: {
        visible: !(prevState.popupState.visible && prevState.popupState.threadId === threadId),
        threadId: prevState.popupState.threadId === threadId ? null : threadId,
      },
      confirmDelete: { visible: false, threadId: null },
    }));
  };  

  const handleDelete = async (threadId) => {
    try {
      const response = await deleteThread(threadId);
      if (response?.success) {
        setState(prevState => ({
          ...prevState,
          threads: prevState.threads.filter(thread => thread.id !== threadId),
          popupState: { visible: false, threadId: null },
          confirmDelete: { visible: false, threadId: null },
        }));
      } else {
        console.error("Failed to delete thread");
      }
    } catch (error) {
      console.error("Error deleting thread:", error);
    }
  };  

  const handleConfirmDelete = (threadId) => {
    setState(prevState => ({
      ...prevState,
      confirmDelete: { visible: true, threadId },
    }));
  };  

  const ThreadCard = ({ thread }) => (
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
                onClick={() => handleConfirmDelete(thread.id)}
              >
                <FaTrashAlt size={15} className="text-red-600 mr-1" /> Delete
              </button>
            </div>
          )}
          {confirmDelete.visible && confirmDelete.threadId === thread.id && (
            <div className="absolute right-0 bg-white text-black rounded shadow-lg z-10 p-4">
              <Text mb={2}>Are you sure you want to delete this thread?</Text>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => handleDelete(thread.id)}
                className="mr-2"
              >
                Yes, delete
              </Button>
              <Button
                size="sm"
                onClick={() => setState(prevState => ({
                  ...prevState,
                  confirmDelete: { visible: false, threadId: null },
                }))}
              >
                Cancel
              </Button>
            </div>
          )}
          <Text fontSize='sm' color='white'>{thread.title}</Text>
        </div>
      </CardBody>
    </Card>
  );  

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
                threads.map(thread => <ThreadCard key={thread.id} thread={thread} />)
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