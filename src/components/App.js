import React from 'react';
import { Button } from '@chakra-ui/react';

import SignIn from './SignIn';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const toggleAuth = () => {
    setIsLoggedIn((prevState) => !prevState);
  };

  return isLoggedIn ? (
    <Button onClick={toggleAuth}>Log Out</Button>
  ) : (
    <SignIn toggleAuth={toggleAuth} />
  );
};

export default App;
