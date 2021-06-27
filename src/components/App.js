import React,{useContext} from 'react';

import SignIn from './SignIn';
import JournalScreen from './JournalScreen';
import { UserContext } from "../providers/UserProvider";


const App = () => {
  const [user] = useContext(UserContext);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const toggleAuth = () => {
    setIsLoggedIn((prevState) => !prevState);
  };

  if(user.loading)
  {
    return <h1>Loading...</h1>
  }
  else{
    return user.data?(<JournalScreen toggleAuth={toggleAuth} />):
    (<SignIn toggleAuth={toggleAuth} />)
  }
  // return isLoggedIn ? (
  //   <JournalScreen toggleAuth={toggleAuth} />
  // ) : (
  //   <SignIn toggleAuth={toggleAuth} />
  // );
};

export default App;
