import { configureStore } from '@reduxjs/toolkit'
import investigationsReducer from './states/investigations'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        investigations: investigationsReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export default store
