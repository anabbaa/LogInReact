import React , {useState , useEffect} from 'react';
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: ()=>{},
  onLogin: (email, password) => {}
});
/*
in this way all my functions and my provider in one file i do not want provider only 
hook and use data in this file
*/
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

const logoutHandler = () => {
  localStorage.removeItem('isLoggedIn');
  setIsLoggedIn(false);
};

const loginHandler = () => {
  localStorage.setItem('isLoggedIn', '1');
  setIsLoggedIn(true);
};
return(
  <AuthContext.Provider
  value={{
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler,
  }}
>
  {props.children}
</AuthContext.Provider>
)
};
export default AuthContext;