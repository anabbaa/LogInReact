import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
//this function will be triggered outside component input
  const activate = () => {
    inputRef.current.focus();
  };
// ref set to father so the child when pass beside props can make a connection
/* use imperative hook use and manipulate something not according to the state or controlled
by the component it needs two parameter ref it self and a function which return an object 
key name it as to you value wull be the name of function or any thing you want to manipulate 
then use the name of key
*/
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});
export default Input;