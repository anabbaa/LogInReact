import React, { useState, useEffect , useRef, useContext, useReducer} from 'react';
import Card from '../UI/Card/Card';
import classes from './LogIn.module.css';
import Button from '../UI/Button/Button';
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";
//you can for reducer add function out side the scope  because it does not need to interact 
//inidee anythin in component function
const emailReucer = (state, action)=>{
  if (action.type === "USER_INPUT"){
    return {value: action.val, isValid: action.val.includes("@")};
  }
  //here i take the latest snapshot updated
  if (action.type === "INPUT_BLUR"){
return{ value: state.val, isValid: state.val };
  }
  //here is default state
return {value: "", isValid: false};
};
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};
const LogIn = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  //reeducer needs three argument function which updates state then initial state
  //and the last one is function for initialstate
  const [emailState, dispatchEmail] = useReducer(emailReucer, {
    value: "",
    isValid : null
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null
  });
/*
- here i use useEffect with dependencies rerender useeffect when componnet reevaluate 
only if a dependency changed and 
- this can be considered sideeffect itis keystroke becaause i 
want to listen to them and have a respone to them
- if i do not pass dependency i will have infinity loop with empty dependecy it will excutes it
once
- it is good practise to have setimeout in useeffect ofcourse i donot want to update state in 
every keystroke and sent them anywhere so iam waiting an it is better to have clean function after
it this clean function will not be run in every call but it will run in the second call for 
useeffect
*/
/*reducer
- sometimes you want to update state has a relation with another state you cannot use updating
with a function here because may be it will happen some updating before each other ofcourse
you can use objectvas initial value for this kinfd of updating states but in so complex states
you need reducer
*/
const { isValid: emailIsValid } = emailState;
const { isValid: passwordIsValid } = passwordState;
useEffect(() => {
  const identifier = setTimeout(() => {
    console.log('Checking form validity!');
    setFormIsValid(
      emailIsValid.includes('@') && passwordIsValid.trim().length > 6
    );
  }, 500);

  return () => {
    console.log('CLEANUP');
    clearTimeout(identifier);
  };
}, [emailIsValid, passwordIsValid]);

const ctx = useContext(AuthContext);
const emailInputRef = useRef();
const passwordInputRef = useRef();

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "USER_INPUT", val:event.target.value
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT", val: event.target.value
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "INPUT_BLUR"
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: "INPUT_BLUR"
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.isValid, passwordState.value);
    if (formIsValid) {
      ctx.onLogin(emailState.isValid, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default LogIn;