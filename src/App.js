import React,{useContext} from 'react';
import LogIn from './components/Login/LogIn.';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  /*the first use of useEffect is to have info of user in localstorage if i use local storage
  alone i will have an infinity loop because it will trigger in every evaluation of the component
  here i do not want dependenciy so it will not trigger again
  */
const ctx = useContext(AuthContext);
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
// do not use usecontect fo big data which changes frequently 
// you can add here any function to provider so pass them to any component even function
//ofcourse without excsuting them
  return (
    <React.Fragment>
      <MainHeader isAuthenticated={ctx.isLoggedIn} />
      <main>
        {!ctx.isLoggedIn && <LogIn />}
        {ctx.isLoggedIn && <Home />}
      </main>
      </React.Fragment>
  );
}
export default App;