import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '..'
import { LOG_IN_STATE } from './slice'

const selectHomepage = (state: RootState) => state.homepage


export const selectAnimationStage = createSelector(selectHomepage, homepage =>
  homepage.animation
)

export const selectLoggedInState = createSelector(selectHomepage, homepage =>
  homepage.loggedIn
)

export const selectLoggingIn = createSelector(selectLoggedInState, loginState =>
  loginState === LOG_IN_STATE.LOGGING_IN
)

export const selectLoggedIn = createSelector(selectLoggedInState, loginState =>
  loginState === LOG_IN_STATE.LOGGED_IN
)

export const selectLoginError = createSelector(selectLoggedInState, loginState =>
  loginState === LOG_IN_STATE.ERROR
)