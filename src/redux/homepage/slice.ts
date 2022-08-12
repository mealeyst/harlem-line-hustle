import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export enum ANIMATION_STAGE {
  INITIALIZING,
  SCRIPT_RUNNING,
  LOGGING_IN,
  COMPLETE
}

interface HomePageState {
  animation: ANIMATION_STAGE,
  loggedIn: boolean
}

export const INITIAL_STATE: HomePageState = {
  animation: ANIMATION_STAGE.INITIALIZING,
  loggedIn: false
}

export const SLICE = createSlice({
  name: 'homepage',
  initialState: INITIAL_STATE,
  reducers: {
    setAnimationStage: (state, action: PayloadAction<ANIMATION_STAGE>) => { state.animation = action.payload },
    logIn: (state) => { state.loggedIn = true }
  }
})