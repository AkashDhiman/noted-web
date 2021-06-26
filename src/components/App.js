import React from 'react';

import SignIn from './SignIn';
import JournalScreen from './JournalScreen';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const toggleAuth = () => {
    setIsLoggedIn((prevState) => !prevState);
  };

  return isLoggedIn ? (
    <JournalScreen toggleAuth={toggleAuth} />
  ) : (
    <SignIn toggleAuth={toggleAuth} />
  );
};

export default App;
