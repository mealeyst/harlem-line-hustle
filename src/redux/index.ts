import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  actions as homepageActions,
  name as homepage,
  reducer as homepageReducer,
  selectors as homepageSelectors
} from './homepage';

const rootReducer = combineReducers({
  [homepage]: homepageReducer
})

const store =  configureStore({
  reducer: rootReducer,
})

export const actions = {
  [homepage]: homepageActions
}

export const selectors = {
  [homepage]: homepageSelectors
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store