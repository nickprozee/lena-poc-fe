import { configureStore } from '@reduxjs/toolkit';
import sessionsReducer from './states/sessions';

export default configureStore({
  reducer: {
    sessions: sessionsReducer
  },
})