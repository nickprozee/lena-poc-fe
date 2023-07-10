import { configureStore } from '@reduxjs/toolkit'
import investigationsReducer from './states/investigations'

export default configureStore({
    reducer: {
        investigations: investigationsReducer,
    },
})
