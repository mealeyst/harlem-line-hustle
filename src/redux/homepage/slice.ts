import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export enum ANIMATION_STAGE {
  INITIALIZING,
  SCRIPT_RUNNING,
  LOGGING_IN,
  ACCESS_GRANTED,
  COMPLETE
}

export enum LOG_IN_STATE {
  INITIAL,
  LOGGING_IN,
  LOGGED_IN,
  ERROR
}

interface HomePageState {
  animation: ANIMATION_STAGE,
  loggedIn: LOG_IN_STATE
}

export const INITIAL_STATE: HomePageState = {
  animation: ANIMATION_STAGE.INITIALIZING,
  loggedIn: LOG_IN_STATE.INITIAL
}

export const SLICE = createSlice({
  name: 'homepage',
  initialState: INITIAL_STATE,
  reducers: {
    setAnimationStage: (state, action: PayloadAction<ANIMATION_STAGE>) => { state.animation = action.payload },
    logIn: (state, action: PayloadAction<LOG_IN_STATE> ) => { state.loggedIn = action.payload }
  }
})