import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/users/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

