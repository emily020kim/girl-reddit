import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { IoIosArrowDown } from "react-icons/io";
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
        <Accordion sx={{ backgroundColor: '#444444', borderRadius: '8px', marginBottom: '10px' }}>
          <AccordionSummary
            sx={{ padding: '0 16px' }}
            expandIcon={<IoIosArrowDown className='text-white'/>}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography sx={{ color: '#ffffff' }}>How do I join grlhood?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '16px', borderTop: '1px solid #ddd' }}>
            <Typography sx={{ color: '#ffffff' }}>
              Good question! For now you can sign up for our platform on web by clicking on the sign up button.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: '#444444', borderRadius: '8px', marginBottom: '10px' }}>
          <AccordionSummary
            sx={{ padding: '0 16px' }}
            expandIcon={<IoIosArrowDown className='text-white'/>}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography sx={{ color: '#ffffff' }}>What can I do on grlhood?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '16px', borderTop: '1px solid #ddd' }}>
            <Typography sx={{ color: '#ffffff' }}>
              Grlhood is a social platform where users can start threads for questions they have to 
              getting other girls opinions on topics. Currently, this is a beta release but later on we 
              will release a community feature where you can chat with other users so stayed tuned!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: '#444444', borderRadius: '8px', marginBottom: '10px' }}>
          <AccordionSummary
            sx={{ padding: '0 16px' }}
            expandIcon={<IoIosArrowDown className='text-white'/>}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography sx={{ color: '#ffffff' }}>If I am running into an issue or have a suggestion where do I reach out?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '16px', borderTop: '1px solid #ddd' }}>
            <Typography sx={{ color: '#ffffff' }}> 
              If you are running into an issue on our platform or have an idea to make grlhood better,
              feel free to send an email to support@grlhood.com.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq