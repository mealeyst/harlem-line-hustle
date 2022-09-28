import { FormEvent, useRef, useEffect, useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { spacing } from '../theme/spacing';
import { color } from "../theme/color";
import { useAppDispatch, useAppSelector } from '../hooks/state';
import { actions } from '../redux/homepage';
import { ANIMATION_STAGE, LOG_IN_STATE } from '../redux/homepage/slice';
import { selectAnimationStage, selectLoginError } from '../redux/homepage/selectors';
import { Button } from './form/Button';
import { Input } from './form/Input';

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

const fadeOut = keyframes`
  to {
    opacity: 0;
    transform: translateY(-10%);
  }
  from {
    opacity: 1;
    transform: translateY(0);
  }
`

export const LoginForm = styled(({className}) => {
  const dispatch = useAppDispatch()
  const animationStage = useAppSelector(selectAnimationStage)
  const error = useAppSelector(selectLoginError)
  const accessGranted = animationStage === ANIMATION_STAGE.ACCESS_GRANTED
  const formRef = useRef<HTMLFormElement>(null);
  const [formFade, setFormFade] = useState<boolean>(true)
  const uNameRef  = useRef<HTMLInputElement>(null)
  const pWordRef = useRef<HTMLInputElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)
  const shouldFireLoginScript = (animationStage === ANIMATION_STAGE.LOGGING_IN)
  useEffect(() => {
    const form = formRef.current
    
    if (form) {
      setTimeout(() => {
        setFormFade(false)
        if(animationStage === ANIMATION_STAGE.INITIALIZING) {
          dispatch(actions.setAnimationStage(ANIMATION_STAGE.SCRIPT_RUNNING))
        }
      }, 3000)
      if (shouldFireLoginScript) {
        const username = uNameRef.current
        const password = pWordRef.current
        const submit = submitRef.current
        if(username && password && submit) {
          const credentials = [
            {u_name: 'shawn.mealey@harlem-line-hustle.com', p_word: 'ILikeProgramming11!'},
            {u_name: 'mealey.shawn@harlem-line-hustle.com', p_word: 'IHeartHacking11!'},
            {u_name: 'admin@harlem-line-hustle.com', p_word: 'password'}
          ];
          credentials.forEach((credential, index) => {
            const { u_name, p_word } = credential;
            setTimeout(() => {
              username.value = u_name;

              password.value = p_word;

              submit.click();
            }, 1000 * index);
          })

        }
      }
    }
  }, [animationStage, dispatch, shouldFireLoginScript])
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    const form = formRef.current
    event.preventDefault();
    if (form) {
      const formData = new FormData(form);

      const data = {
        username: formData.get('user_name') as string,
        password: formData.get('password') as string,
      }
      if(data.username === 'admin@harlem-line-hustle.com' && data.password === 'password') {
        dispatch(actions.setAnimationStage(ANIMATION_STAGE.ACCESS_GRANTED))
        setTimeout(() => {
          dispatch(actions.logIn(LOG_IN_STATE.LOGGED_IN))
        }, 3000)
        document.cookie = "loggedin=true;";
      } else {
        // setFormError(true)
        dispatch(actions.logIn(LOG_IN_STATE.ERROR))
        setTimeout(() => {
          dispatch(actions.logIn(LOG_IN_STATE.INITIAL))
        }, 500)
      }
    }
    return false; // prevent reload
  }
  const errorClasses = error ? ' shake error' : ''
  const accessGrantedClass = accessGranted ? ' fadeOut': ''
  const fadeClass = formFade ? ' fadeIn' : ''
  return(
    <form className={`${className}${errorClasses}${fadeClass}${accessGrantedClass}`} id="login_form" onSubmit={handleLogin} ref={formRef}>
      <div className="spacer spacer-top">
        <h1>Login</h1>
      </div>
      <div className="body-region">
        <div className="spacer spacer-left"/>
        <div className="body-content">
          <label>
            <span>Username:</span>
            <Input
              type="text" 
              name="user_name" 
              id="user_name"
              error={error}
              ref={uNameRef}
            />
          </label>
          <label>
            <span>Password:</span>
            <Input
              type="text" 
              name="password" 
              id="password"
              error={error}
              ref={pWordRef}
            />
          </label>
          <Button id="submit" ref={submitRef} error={error}>Submit</Button>
        </div>
        <div className="spacer spacer-right"/>
      </div>
      <div className="spacer spacer-bottom" />
    </form>
  )
})`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-end;
  backdrop-filter: blur(5px);
  border-color: ${color('primary.400', 0.7)};
  border-top-width: 8px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-style: solid;
  transition: border-color 0.3s ease-in-out;
  max-width: ${spacing(100)};
  margin: auto;
  opacity: 1;
  &.error{
    border-color: ${color('red.600')};
    color: ${color('red.100')};
    background-color: ${color('red.900', 0.4)};
  }
  .body-region {
    display: flex;
    width: 100%;
  }
  .body-content {
    background-color: ${color('primary.900', 0.5)};
    width: 100%;
    padding: ${spacing(4)};
  }
  .spacer {
    background-color: ${color('primary.700', 0.4)};
    display: flex;
    &.spacer-top {
      height: 80px;
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;
    }
    &.spacer-left, &.spacer-right {
      width: 20px;
      height: 100%;
    }
    &.spacer-bottom {
      height: 20px;
      width: 100%;
      padding-top: ${spacing(6)};
      padding-left: calc(20px + ${spacing(4)});
      padding-right: calc(20px + ${spacing(4)});
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
    margin-top: ${spacing(2)};
    margin-bottom: ${spacing(2)};
    flex-basis: 100%;
    flex-direction: column;
    transition: color 0.3s ease-in-out;
    span {
      margin-top: ${spacing(2)};
      margin-bottom: ${spacing(2)};
    }
  }
  &.fadeIn {
    animation: ${fadeIn} 3s ease-in-out forwards;
  }
  &.fadeOut {
    animation: ${fadeOut} 0.5s ease-in-out forwards;
  }
  &.shake {
    animation: ${shake} 0.3s ease-in-out forwards !important;
  }
`

