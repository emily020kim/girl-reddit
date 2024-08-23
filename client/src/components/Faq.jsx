import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react';

import { FaQuestion } from "react-icons/fa";

const Faq = () => {
  return (
    <div className='flex w-full my-60'>
      <div className='flex flex-col w-1/2 justify-start'>
        <div className="flex items-center">
          <FaQuestion size={14} className="text-white mr-2"/>
          <h4 className="text-white font-medium text-lg">FAQs</h4>
        </div>
        <div className='flex'>
          <h1 className="text-cyan text-6xl font-medium">
            Let&apos;s answer your questions!
          </h1>
        </div>
      </div>
      <div className="flex flex-col w-1/2">
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: '#97c1a9', color: 'white' }}>
                <Box as='span' flex='1' textAlign='left'>
                  How do I join grlhood?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              Good question! Currently, you can sign up for grlhood by clicking on the Sign up button.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: '#97c1a9', color: 'white' }}>
                <Box as='span' flex='1' textAlign='left'>
                  What can I do on grlhood?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              grlhood is a social platform where users can start threads to ask questions, get opinions, or even to just start a conversation.
              Currently, grlhood is in it&apos;s beta release so stay tuned for more features coming soon.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: '#97c1a9', color: 'white' }}>
                <Box as='span' flex='1' textAlign='left'>
                  If I encounter an issue or have a suggestion for making the platform better where do I reach out?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              If you are experiencing an issue or have suggestions to make the platform better, please email support@grlhood.com.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq