import React from 'react';
import { Center, VStack } from '@chakra-ui/react';

import JournalCard from './JournalCard';

const JournalList = ({ journals,setCurrentDiary}) => {
  return (
    <VStack
      minW={'400px'}
      maxW={'400px'}
      minH={'720px'}
      maxH={'720px'}
      bg={'#edf2f7'}
      shadow={'md'}
    >
      <Center
        width={'100%'}
        bg={'green.400'}
        color={'white'}
        height={'50px'}
        fontSize={'1.5rem'}
        fontWeight={'bold'}
        boxShadow={'xl'}
      >
        All Journals
      </Center>
      {journals.map((journal) => (
        <JournalCard journal={journal} setCurrentDiary={setCurrentDiary} key={journal.id} />
      ))}
    </VStack>
  );
};

export default JournalList;
