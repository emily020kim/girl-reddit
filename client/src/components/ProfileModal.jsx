import { useEffect, useState } from "react";
import { fetchAllThreads } from "../api/ajaxHelpers";
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
} from '@chakra-ui/react';

const ProfileModal = ({ isOpen, onClose }) => {
  const [threads, setThreads] = useState([]);
  const [showThreads, setShowThreads] = useState(false);
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('id');

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
              {threads?.length ? (
                threads.map(thread => (
                  <Text key={thread.id}>{thread.title}</Text>
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