import { FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { spacing } from '../theme/spacing';
import { color } from "../theme/color";

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

export const LoginForm = styled(({className}) => {
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event)
  }
  return(
    <form className={className} onSubmit={handleLogin}>
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
  border-radius: ${spacing(4)};
  backdrop-filter: blur(5px);
  border: 3px solid ${color('primary.600')};
  h1 {
    text-transform: uppercase;
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
      border-radius: ${spacing(2)};
      box-shadow: 0 0 0 transparent;
      transition: box-shadow 0.25s ease-in-out;
      padding: 0 ${spacing(2)};
      text-shadow: 0 0 2px ${color('primary.200')};
      &:focus {
        outline: none;
        box-shadow: inset 0 0 2px ${color('primary.50')}, 0 0 3px ${color('primary.100')};
      }
    }
  }
  button {
    background-color: ${color('primary.400', 0.7)};
    color: ${color('primary.900')};
    border: none;
    height: ${spacing(8)};
    width: ${spacing(30)};
    border-radius: ${spacing(2)};
    text-transform: uppercase;
    font-weight: bold;
    transition: background-color 0.25s ease-in-out;
    &:focus {
      outline: none;
      background-color: ${color('primary.100', 0.7)};
      box-shadow: inset 0 0 2px ${color('primary.50')}, 0 0 3px ${color('primary.100')}, 0 0 6px ${color('primary.200')};
    }
  }
  &.shake {
    animation: ${shake} 0.5s ease-in-out forwards !important;
  }
`

