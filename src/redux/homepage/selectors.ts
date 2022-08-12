import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '..'

const selectHomepage = (state: RootState) => state.homepage


export const selectAnimationStage = createSelector(selectHomepage, homepage =>
  homepage.animation
)

export const selectLoggedIn = createSelector(selectHomepage, homepage =>
  homepage.loggedIn
)