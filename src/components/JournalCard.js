import React from 'react';
import { Button } from '@chakra-ui/react';
import { reviewDiary } from '../utils/firebase';
const JournalCard = ({ journal,setCurrentDiary }) => {
  const clickHandler=async (event)=>{

    console.log(event.target.value)
    setCurrentDiary(event.target.value)
  }
  return (
    <Button
      mt={10}
      w={'80%'}
      minH={'2rem'}
      margin={'1rem'}
      bg={'green.400'}
      color={'white'}
      rounded={'lg'}
      onClick={clickHandler}
      value={journal.name}
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
