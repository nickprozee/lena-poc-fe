import { configureStore } from '@reduxjs/toolkit'
import investigationsReducer from './states/investigations'

export const store = configureStore({
    reducer: {
        investigations: investigationsReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export default store
