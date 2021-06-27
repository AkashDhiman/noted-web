import React,{useContext, useEffect} from 'react';
import { Box, Image } from '@chakra-ui/react';
import { reviewDiary,retrieveChatDump } from '../utils/firebase';
import ComposeBox from './ComposeBox';
import Message from './Message';
import { UserContext } from '../providers/UserProvider';
const mockMessages = [
];

const NotesView = ({currDiary}) => {
  const[user]=useContext(UserContext)
  const uid=user.data.uid
  const [messages, setMessages] = React.useState([...mockMessages]);
  const[loading,setLoading]=React.useState(true)
  useEffect(async () => {

    var textArr=[]
    console.log('curr diary is: '+currDiary)
    if(currDiary == 'chatDump')
    {
      var chatDump=await retrieveChatDump(uid)
      for (var idx in chatDump){
        textArr.push({id:chatDump[idx].time,text:chatDump[idx].data,type:"text"})
      }
    }
    else{
      var diaryContent=await reviewDiary(uid,currDiary)
      for (var id in diaryContent){
        console.log(diaryContent[id].data)
        textArr.push({id:diaryContent[id].time,text:diaryContent[id].data,type:"text"})
      }
    }
    
    setMessages(textArr)
    console.log("Notes view updated")
    console.log(messages)
    setLoading(false)
  }, [currDiary])
  if(loading)
  {
    return <h1>Loading...</h1>
  }
  else{
    return (
      <>
        <Box
          minW={'800px'}
          maxW={'800px'}
          bg={'#edf2f7'}
          minH={'720px'}
          maxH={'720px'}
          shadow={'md'}
          overflowY="scroll"
        >
          {messages.map((message) => {
            return message.type === 'text' ? (
              <Message text={message.text} key={message.id} />
            ) : (
              <Image src={message.image} size={'md'} />
            );
          })}
          <ComposeBox currDiary={currDiary} setMessages={setMessages} />
        </Box>
      </>
    );   
  }

};

export default NotesView;
