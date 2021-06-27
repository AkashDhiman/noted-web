import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import UserProvider from './providers/UserProvider'
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
