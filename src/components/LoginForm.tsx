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

export const LoginForm = styled(({className}) => {
  const dispatch = useAppDispatch()
  const animationStage = useAppSelector(selectAnimationStage)
  const loginError = useAppSelector(selectLoginError)
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
          dispatch(actions.setAnimationStage(ANIMATION_STAGE.COMPLETE))
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
        console.log('Success');
        dispatch(actions.logIn(LOG_IN_STATE.LOGGED_IN))
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
  const errorClasses = loginError ? ' shake error' : ''
  const fadeClass = formFade ? ' fadeIn' : ''
  return(
    <form className={`${className}${errorClasses}${fadeClass}`} id="login_form" onSubmit={handleLogin} ref={formRef}>
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
              ref={uNameRef}
            />
          </label>
          <label>
            <span>Password:</span>
            <Input
              type="password" 
              name="password" 
              id="password" 
              ref={pWordRef}
            />
          </label>
          <Button id="submit" ref={submitRef} error={loginError}>Submit</Button>
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
    // input {
    //   caret-color: ${color('primary.100')};
    //   color: ${color('primary.50')};
    //   min-height: ${spacing(8)};
    //   flex-basis: 100%;
    //   background-color: ${color('primary.800', 0.5)};
    //   border: 1px solid ${color('primary.400')};
    //   border-radius: ${spacing(1)};
    //   box-shadow: 0 0 0 transparent;
    //   transition: all 0.3s ease-in-out;
    //   padding: 0 ${spacing(2)};
    //   text-shadow: 0 0 2px ${color('primary.200')};
    //   &:focus {
    //     outline: none;
    //     box-shadow: inset 0 0 2px ${color('primary.50')}, 0 0 3px ${color('primary.100')};
    //   }
    // }
    // input:-webkit-autofill,
    // input:-webkit-autofill:hover, 
    // input:-webkit-autofill:focus,
    // textarea:-webkit-autofill,
    // textarea:-webkit-autofill:hover,
    // textarea:-webkit-autofill:focus,
    // select:-webkit-autofill,
    // select:-webkit-autofill:hover,
    // select:-webkit-autofill:focus {
    //   -webkit-text-fill-color: ${color('primary.200')};
    //   -webkit-box-shadow: 0 0 0px 1000px ${color('primary.900')} inset;
    // }
  }
  // button {
  //   background-color: ${color('primary.400', 0.7)};
  //   color: ${color('primary.900')};
  //   border: none;
  //   height: ${spacing(8)};
  //   width: ${spacing(30)};
  //   border-radius: ${spacing(1)};
  //   text-transform: uppercase;
  //   font-weight: bold;
  //   margin-top: ${spacing(4 )};
  //   margin-bottom: ${spacing(2)};
  //   transition: all 0.3s ease-in-out;
  //   &:focus {
  //     outline: none;
  //     background-color: ${color('primary.100', 0.7)};
  //     box-shadow: inset 0 0 2px ${color('primary.50')}, 0 0 3px ${color('primary.100')}, 0 0 6px ${color('primary.200')};
  //   }
  // }
  &.fadeIn {
    animation: ${fadeIn} 3s ease-in-out forwards;
  }
  &.shake {
    animation: ${shake} 0.3s ease-in-out forwards !important;
  }
`

