import React from 'react';
import { Button } from '@chakra-ui/react';

const JournalCard = ({ journal }) => {
  return (
    <Button
      mt={10}
      w={'80%'}
      minH={'2rem'}
      margin={'1rem'}
      bg={'green.400'}
      color={'white'}
      rounded={'lg'}
      boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
      _hover={{
        bg: 'green.500',
      }}
    >
      {journal.name}
    </Button>
  );
};

export default JournalCard;
