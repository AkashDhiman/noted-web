import React, { useContext, useEffect } from 'react';
import { Center, HStack, Box, VStack } from '@chakra-ui/react';
import {retrieveDiaryNames} from '../utils/firebase'
import Navbar from './Navbar';
import JournalList from './JournalList';
import NotesView from './NotesView';
import { UserContext } from '../providers/UserProvider';

const mockJournals = [
  { id: 1, name: 'College Notes' },
  { id: 2, name: 'Books to Read' },
  { id: 3, name: 'Resourceful Websites' },
];

const JournalScreen = ({ toggleAuth }) => {
  const[user]=useContext(UserContext)
  const uid=user.data.uid
  const [journals, setJournal] = React.useState([...mockJournals]);
  const [currDiary,setCurrentDiary]=React.useState('chatDump')
  const [loading,setLoading]=React.useState(true)
  
  useEffect(async () => { 
    console.log("useEffect running")
    var listOfNames=await retrieveDiaryNames(uid)    

    // Take the list of journals and set it for sidebar render

    var journalList=[]

    for (var id1 in listOfNames){
      journalList.push({id:id1,name:listOfNames[id1]})
    }

    setJournal(journalList)

    
    setLoading(false)
  }, [])


  if(loading == true){
    return <h1>Loading</h1>
  }
  else{
    return (
      <Center marginTop={'20px'}>
        <VStack minW={'800px'}>
          <Navbar
            minW={'1250px'}
            maxW={'1250px'}
            toggleAuth={toggleAuth}
            setJournal={setJournal}
            currDiary={currDiary}
            setCurrentDiary={setCurrentDiary}
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
              <JournalList setCurrentDiary={setCurrentDiary} journals={journals} />
              <NotesView currDiary={currDiary} /> 
            </HStack>
          </Box>
        </VStack>
      </Center>
    
    );
  }

};

export default JournalScreen;
