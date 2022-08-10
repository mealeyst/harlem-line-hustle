import { FormEvent, useRef, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { spacing } from '../theme/spacing';
import { color } from "../theme/color";
import ErrorContext from '../contexts/ErrorContext';

const shake = keyframes`
  0%, 100% {
    transform: translateX(0px);
  }
  25%, 75% {
    transform: translateX(-30px);
  }
  50% {
    transform: translateX(30px);
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const LoginForm = styled(({className}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { setError } = useContext(ErrorContext);
  const form = formRef.current
  if (form) {
    setTimeout(() => {
      form.classList.remove('fadeIn');
    }, 3000)
  }
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (form && setError) {
      const formData = new FormData(form);

      const data = {
        username: formData.get('user_name') as string,
        password: formData.get('password') as string,
      }
      if(data.username === 'admin@harlem-line-hustle.com' && data.password === 'password') {
        console.log('Success');
      } else {
        form.classList.add('shake');
        form.classList.add('error');
        setError(new Error("Incorrect Usernam and Password!"))
        setTimeout(() => {
          form.classList.remove('shake');
          form.classList.remove('error');
          form.classList.remove('fadeIn');
          setError(null)
        }, 500)
      }
    }
    return false; // prevent reload
  }
  return(
    <form className={`${className} fadeIn`} id="login_form" onSubmit={handleLogin} ref={formRef}>
      <h1>Login</h1>
      <label>
        <span>Username:</span>
        <input type="text" name="user_name" id="user_name"/>
      </label>
      <label>
        <span>Password:</span>
        <input type="password" name="password" id="password"/>
      </label>
      <button>Submit</button>
    </form>
  )
})`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-end;
  padding: ${spacing(4)};
  background-color: ${color('primary.900', 0.1)};
  border-radius: ${spacing(3)};
  backdrop-filter: blur(5px);
  border: 3px solid ${color('primary.600')};
  transition: border 0.3s ease-in-out;
  max-width: ${spacing(100)};
  margin: auto;
  &.error{
    border: 3px solid ${color('red.600')};
    color: ${color('red.200')};
    input {
      caret-color: ${color('red.100')};
      color: ${color('red.200')};
      background-color: ${color('red.800', 0.5)};
      border: 1px solid ${color('red.400')};
      text-shadow: 0 0 2px ${color('red.200')};
      &:focus {
        outline: none;
        box-shadow: inset 0 0 2px ${color('red.50')}, 0 0 3px ${color('red.100')};
      }
    }
    button {
      background-color: ${color('red.400', 0.7)};
      color: ${color('red.900')};
      &:focus {
        background-color: ${color('red.100', 0.7)};
        box-shadow: inset 0 0 2px ${color('red.50')}, 0 0 3px ${color('red.100')}, 0 0 6px ${color('red.200')};
      }
    }
  }
  h1 {
    text-transform: uppercase;
    transition: color 0.3s ease-in-out;
  }
  input, button {
    box-sizing: border-box;
  }
  label {
    display: flex;
    justify-content: center;
    margin: ${spacing(2)};
    flex-basis: 100%;
    flex-direction: column;
    transition: color 0.3s ease-in-out;
    span {
      margin: ${spacing(2)}
    }
    input {
      caret-color: ${color('primary.100')};
      color: ${color('primary.200')};
      min-height: ${spacing(8)};
      flex-basis: 100%;
      background-color: ${color('primary.800', 0.5)};
      border: 1px solid ${color('primary.400')};
      border-radius: ${spacing(1)};
      box-shadow: 0 0 0 transparent;
      transition: all 0.3s ease-in-out;
      padding: 0 ${spacing(2)};
      text-shadow: 0 0 2px ${color('primary.200')};
      &:focus {
        outline: none;
        box-shadow: inset 0 0 2px ${color('primary.50')}, 0 0 3px ${color('primary.100')};
      }
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      -webkit-text-fill-color: ${color('primary.200')};
      -webkit-box-shadow: 0 0 0px 1000px ${color('primary.900')} inset;
    }
  }
  button {
    background-color: ${color('primary.400', 0.7)};
    color: ${color('primary.900')};
    border: none;
    height: ${spacing(8)};
    width: ${spacing(30)};
    border-radius: ${spacing(1)};
    text-transform: uppercase;
    font-weight: bold;
    margin: ${spacing(2)};
    transition: all 0.3s ease-in-out;
    &:focus {
      outline: none;
      background-color: ${color('primary.100', 0.7)};
      box-shadow: inset 0 0 2px ${color('primary.50')}, 0 0 3px ${color('primary.100')}, 0 0 6px ${color('primary.200')};
    }
  }
  &.fadeIn {
    animation: ${fadeIn} 3s ease-in-out forwards;
  }
  &.shake {
    animation: ${shake} 0.3s ease-in-out forwards !important;
  }
`
