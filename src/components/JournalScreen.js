import React from 'react';
import { Center, HStack, Box, VStack } from '@chakra-ui/react';

import Navbar from './Navbar';
import JournalList from './JournalList';
import NotesView from './NotesView';

const mockJournals = [
  { id: 1, name: 'College Notes' },
  { id: 2, name: 'Books to Read' },
  { id: 3, name: 'Resourceful Websites' },
];

const JournalScreen = ({ toggleAuth }) => {
  const [journals, setJournal] = React.useState([...mockJournals]);
  return (
    <Center marginTop={'20px'}>
      <VStack minW={'800px'}>
        <Navbar
          minW={'1250px'}
          maxW={'1250px'}
          toggleAuth={toggleAuth}
          setJournal={setJournal}
        />
        <Box
          minW={'1200px'}
          maxW={'1200px'}
          bg={'gray.200'}
          minH={'720px'}
          maxH={'720px'}
          boxShadow={'lg'}
        >
          <HStack>
            <JournalList journals={journals} />
            <NotesView />
          </HStack>
        </Box>
      </VStack>
    </Center>
  );
};

export default JournalScreen;
