import React from 'react';
import { Text,Box,Heading } from '@chakra-ui/react';

const Message = ({ text }) => {
  return (
  <Box maxW="sm" background="white" borderWidth="1px" borderRadius="lg" overflow="hidden">
  <Box m="5" as="a" href="/blog-post-thing">
    <Heading m="5" mb="0" as="h4" size="md">Chat</Heading>
    <Text m="5" mt="0">{text}</Text>
  </Box>
</Box>
)
  
  // <Box border="2px" ><Text>{text}</Text></Box>;
};

export default Message;
