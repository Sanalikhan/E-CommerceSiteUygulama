
import { createSlice } from '@reduxjs/toolkit';

const persistedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
const persistedToken = localStorage.getItem('authToken') || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: persistedUser,
    token: persistedToken,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
      localStorage.setItem('authToken', action.payload.token);
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
