import React from 'react';
import { Box, Image } from '@chakra-ui/react';

import ComposeBox from './ComposeBox';
import Message from './Message';

const mockMessages = [
  { id: 1, text: 'lorem ipsum doler set.', type: 'text' },
  {
    id: 2,
    image: 'https://picsum.photos/200/300',
    type: 'image',
  },
  { id: 3, text: 'hello there! this is a message', type: 'text' },
];

const NotesView = () => {
  const [messages, setMessages] = React.useState([...mockMessages]);

  return (
    <>
      <Box
        minW={'800px'}
        maxW={'800px'}
        bg={'#edf2f7'}
        minH={'720px'}
        maxH={'720px'}
        shadow={'md'}
      >
        {messages.map((message) => {
          return message.type === 'text' ? (
            <Message text={message.text} key={message.id} />
          ) : (
            <Image src={message.image} size={'md'} />
          );
        })}
        <ComposeBox setMessages={setMessages} />
      </Box>
    </>
  );
};

export default NotesView;
